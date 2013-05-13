(function($){

    //"use strict";

    // default css options
    var default_layer_css = {
        'position' : 'absolute',
        'background-color' : 'black',
        'opacity' : '0.3',
        'height' : '5000px',  //XXX: tmp hard code
        'width' : '100%', 
        'top': '0px',
        'z-index': 100000,
        'pointer-events' : 'none'  // dont allow pointe events
    };

    var default_highlight_css = {
        'position' : 'absolute',
        'background-color': 'white',
        'opacity' : '0.4',
        'z-index': 100000+1  // gruesome
    };

    // NOTE: to be moved to separate css file
    var default_content_css = {
        'position' : 'absolute',
        'background-color': 'white',
        //'opacity' : '0.4',
        'font-family':  'Courier, "Courier New", monospace',
        'border' : '1px dashed black',
        'z-index': 100000+1,  // gruesome
        'pointer-events' : 'none'  // dont allow pointe events
    };
        

    function getParentLayer () {
        //NOTE: currently we dont limit layer to the top
        var patid = $('body').data('pat.id');
        
        if (!patid) {
            throw "No id sepcified on newlayer setup!";
        }

        return $("#"+patid);
    }

    // passing back boolean cannot make it a jquery object
    $.isPatted = function ($e) {
        var $attached = $e.data('pat.attachedPanel');
        if ($attached) {
            // ensure that these are not orphaned from remove
            $attached = $attached.filter(
                   function (e) { return e.parent().length; }
                   ).length;
        }

        return $attached ? true : false;
    }

    var LOAD_DELAY = 300;
    
    $.fn.pat = function(cmd, options){

        var $self = $(this);

        if (this.length == 0) {
            throw "No elemented passed to pat.js - use $('body')";
        }

        var patOptions = options;

        var ret = this.each(function(){

            if (console) {
                console.log("[pat.js] checking out the cmd '"+cmd+"' patOpts "+JSON.stringify(patOptions))
            }

            if (cmd === 'init') {
                $self.data('pat.options', patOptions);
                if (patOptions.script) {
                    $.each(patOptions.script, function (i, e) {
                        if ($("script[src='"+e+"']").length==0) {
                            // we need to slightly delay each load
                            setTimeout(function () {
                                $("<script/>").attr('src', e).appendTo('body');
                            }, i * LOAD_DELAY);
                        }
                    });
                }
                if (patOptions.css) {
                    $.each(patOptions.css, function (i, e) {
                        if ($("link[href='"+e+"']").length==0) {
                            $("<link rel='stylesheet'/>").attr('href', e).appendTo('body');
                        }
                    });
                }
            } 
            else if (cmd === 'newlayer') {
                var cssOption = $.extend({},
                    default_layer_css,
                    patOptions.css
                );
                
                var $e = $("<div/>").css(cssOption);

                if (patOptions.id) {
                    $self.data('pat.id', patOptions.id);
                    $e.attr('id', patOptions.id);
                }

                $e.appendTo('body');
            }
            else if (cmd === 'highlight') {

                // Create window: split top layer into window pane
                // TODO: iteration 1: just provide opposit color
                var offset = $self.offset();
                offset.width = $self.outerWidth();
                offset.height = $self.outerHeight();

                // setting up the highlight layer
                var $topL = getParentLayer();
                var cssOption = $.extend({},
                        default_highlight_css,
                        {
                            top: offset.top+'px',
                            left: offset.left+'px',
                            height: offset.height+'px',
                            width: offset.width+'px'
                        });

                var $hl = $("<div/>").css(cssOption).appendTo($topL);

                // Ensure that we can deal with the layer, insert new item
                $.each(['top', 'left', 'right', 'bottom'], function (i, pos) {
                    if (pos in patOptions) {
                        var content = patOptions[pos];

                        // fill in the template
                        var $out = $("<div/>");
                        // layout the class
                        $out.addClass('patjs').addClass(pos+'panel');

                        // add the css
                        $out.css(default_content_css);
                        
                        // content
                        $.each(content, function (tag,text) {
                            $('<'+tag+'/>').text(text).appendTo($out);
                        });

                        // append to body - we dont want to opacity effect
                        $out.appendTo('body');

                        // position
                        $out.css({
                            top: (offset.top + 
                                  (
                                   pos == 'bottom' ? offset.height : 
                                   pos == 'top' ? -$out.outerHeight() :
                                   0 
                                   ) 
                                 )+'px',
                            left: (offset.left + 
                                  (
                                   pos == 'right' ? offset.width : 
                                   pos == 'left' ? -$out.outerWidth() : 
                                   0
                                  )
                                 )+'px',
                            width: $out.outerWidth(),
                            height: $out.outerHeight()
                        });

                        // register with the variable (e.g. pat.leftpanel)
                        $self.data('pat.attachedPanel', [$hl, $out]);
                    }
                });
            }
            else if (cmd === 'menu') {
                // setting up the highlight layer
                var $topL = getParentLayer();

                if (patOptions.pos !== 'top') {
                    throw "Only top menu implemented now!";
                }

                var content = patOptions.content;

                // fill in the template
                var $out = $("<div/>");
                // layout the class
                $out.addClass('patjs').addClass(patOptions.pos+'menu');

                // add the css
                // content
                $out.css(default_content_css).html(content);

                // append to body - we dont want to opacity effect
                $out.appendTo('body');

                $out.css({
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: patOptions.size
                });

                // register with the variable (e.g. pat.leftpanel)
                $self.data('pat.attachedPanel', [$out]);
            }
            else if (cmd === 'noHighlight') {
                var panels = $self.data('pat.attachedPanel');

                $.each(panels, function (i, p) {
                    p.remove();
                });
                $self.data('pat.attachedPanel', null);
            }
            else if (cmd === 'clear') {
                var $l = getParentLayer();
                $(".patjs").remove();
                $l.remove();
            }
            else {
                throw "Unknown cmd parameter passed "+cmd;
            }

            return ret;
        });
    };

})(jQuery);

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
        'z-index': 100000+1  // gruesome
    };
        

    function getParentLayer () {
        //NOTE: currently we dont limit layer to the top
        var patid = $('body').data('pat.id');
        
        if (!patid) {
            throw "No id sepcified on newlayer setup!";
        }

        return $("#"+patid);
    }

    $.fn.pat = function(cmd, options){

        if (this.length == 0) {
            throw "No elemented passed to pat.js - use $('body')";
        }

        var patOptions = options;

        return this.each(function(){

            if (console) {
                console.log("[pat.js] checking out the cmd '"+cmd+"' patOpts "+JSON.stringify(patOptions))
            }

            if (cmd === 'init') {
                $(this).data('pat.options', patOptions);
            } 
            else if (cmd === 'newlayer') {
                var cssOption = $.extend({},
                    default_layer_css,
                    patOptions.css
                );
                
                var $e = $("<div/>").css(cssOption);

                if (patOptions.id) {
                    $(this).data('pat.id', patOptions.id);
                    $e.attr('id', patOptions.id);
                }

                $e.appendTo('body');
            }
            else if (cmd === 'highlight') {

                // Create window: split top layer into window pane
                // TODO: iteration 1: just provide opposit color
                var offset = $(this).offset();
                offset.width = $(this).outerWidth();
                offset.height = $(this).outerHeight();

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

                $("<div/>").css(cssOption).appendTo($topL);

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

                        // now, append so we get the height
                        $out.appendTo($topL);

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
                        $(this).data('pat.'+pos+'panel', $out);
                    }
                });
            }
            else if (cmd === 'menu') {

                throw "Not implemented";

            }
            else if (cmd === 'clear') {
                var $l = getParentLayer();
                $l.remove();
            }
            else {
                throw "Unknown cmd parameter passed "+cmd;
            }

        });
    };

})(jQuery);

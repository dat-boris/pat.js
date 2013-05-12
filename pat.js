(function($){

    //"use strict";

    // default css options
    var default_layer_css = {
        'background-color' : 'black',
        opacity: '0.3',
        height: '100%',
        width: '100%', 
        position: 'fixed',
        'top': '0px',
        'z-index': 100000
    };

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

                throw "Not implemented";

            }
            else if (cmd === 'menu') {

                throw "Not implemented";

            }
            else if (cmd === 'clear') {

                var patid = $(this).data('pat.id');
                
                if (!patid) {
                    console.warn("No id sepcified on newlayer setup!");
                    return;
                }
                $("#"+patid).remove();
            }
            else {
                throw "Unknown cmd parameter passed "+cmd;
            }

        });
    };

})(jQuery);

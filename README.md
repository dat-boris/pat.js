pat.js
======

Patting on a layering system on top of any existing webpages.

    // <script src="pat.js"></script>

	// initialised all relevant scritps for the layer
    $().pat('init', {
        'script': 'jquery.js',
        'css', 'uncommon.css'
        });
    
    // default background layer
    $().pat('newlayer', {
    	background-color: 'black',
        opacity: 0.5
    });
    
    // all content is divided between:
    //   { titlte: 'always top', 
    //     'h1: 'left text (36px)', 
    //     'h2': 'right text (24px)',
    //     'h3' : ' bottom text (12px)'
    //   }
    $().pat('overlay', $("#test"),
    	{ ... }
        )
        
    // for speciy iframe for the top menu
    $().pat('menu', 'top', 
    	{ 
         iframe: 'http://....',
         height: 50px
        }
        )
         
    
    

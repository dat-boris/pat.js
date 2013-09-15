describe("pat.js", function() {

  var MIN_SCREEN_HEIGHT = $(window).height()-10 /* leeway */;

  describe("default setup", function() {

      beforeEach(function() {
          loadFixtures('basic_bs.html');

          // load the script
          $('body').pat('init', {
              'script': ['jquery.js'],
              'css': ['uncommon.css']
          });

      });

      afterEach(function() {
          // load the script
          $('body').pat('clear');

      });
    // simple check if jquery is applicable :-)
    describe("for new layer", function () {
        it('should give front layer option', function () {

          $('body').pat('newlayer', {
              'id' : 'newlayer',
              'css' : {
                  'background-color' : 'black',
                  opacity : 0.5
              }
          });

          expect($("#newlayer").height()).toBeGreaterThan(MIN_SCREEN_HEIGHT);

        });
        
        it("should highlight with existing items", function () {

            var $toHighlight = $('.nav-header');

            $toHighlight.pat('highlight', {
                'top' : { 'h1': 'Great heaader' },
                'left' : {'h1' : '+10%'},
                'right' : { 'h1' : 'compare to right border' },
                'bottom' : { 'h2' : 'this is bottom layer' },
            });

            // note the patjs special layout
            expect($(".patjs.leftpanel").length).toEqual($toHighlight.length);

        });

        it("should display proper css ", function () {

            var $toHighlight = $('.nav-header');

            $toHighlight.pat('halo');

            // note the patjs special layout
            expect($(".patjs-halo").length).toEqual($toHighlight.length);
            expect($(".patjs-halo").first().hasClass('patjs-halo')).toBe(true);

        });
        
    });
    
    /**
      The feaures:
      1. select the multiple items
      2. feedback of what items was selected
      3. allow display a list of overall items
      */
    describe("select multiple items", function () {
        it("should give multiple css ", function () {
            var $toHighlight = $('.nav-header');
            $toHighlight.pat('halo');

            $('body').pat('haloed', function (items) {
                expect(items.length).toEqual(3);
            });
        });

        it("should allow mouseover to highlight elements", function () {
            // allow mouseover
            $(".selectable").pat('hoverable');
            $(".selectable").mouseenter();
            var boxs = $(".selectable").first().hasClass('patjs-hovered');
            expect(boxs).toBeTruthy();
        });

        it ("should allow multiple click actions to select items", function () {
            $(".selectable").pat('selectable');
            $(".selectable").click();
            $('body').pat('selected', function (items) {
                expect(items.length).toEqual(1);
            });

        });
    });

  });


});


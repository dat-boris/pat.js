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

            expect($(".patjs.leftpanel").length).toEqual($toHighlight.length);

        });
    });

    /*
       TODO
    it("should attach comment to existing items");
    it("should allow top bar to be shown");
    */
  });


});


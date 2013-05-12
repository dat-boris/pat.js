describe("PatOverlay", function() {

  describe("basic setup with default config", function() {

    beforeEach(function() {
      loadFixtures('basic_bs.html');
    });

    // simple check if jquery is applicable :-)
    describe("Must have jquery", function () {
        it('should be able to search item', function () {

        });
    });

    /*
    describe("Must load a seperate layer");
    describe("Load data with refernece to and object");
    describe("Load the top bar");
    */
  });


  /*
  describe("basic setup with default config", function() {
    var $gallery, $el, api, clock,
        fullImageHeight = 400,
        fullImageWidth = 250;

    beforeEach(function() {
      clock = sinon.useFakeTimers();

      loadFixtures('basic_gallery.html');

      $el = $('#jasmine-fixtures');
      $gallery = $('#gallery');
      SpecHelper.loadFakeImages($gallery, fullImageWidth, fullImageHeight);
      $gallery.flowgallery();
      api = $gallery.data('flowgallery');
    });

    afterEach(function() {
      clock.restore();
    });

    describe('gallery list', function() {
      it('should be visible', function() {
        expect( $gallery.css('visibility') ).toEqual('visible');
      });

      it('should have 6 images', function() {
        expect( $gallery.find('img').length ).toEqual(6);
      });

      it('should set non-active images to thumbnail size', function() {
        var $images = $gallery.find('li').not('.active');
        var expectedHeight = Math.round(fullImageHeight * 100 / fullImageWidth);
        $images.each(function(index) {
          expect( $(this).width() ).toEqual(100); // set loadingWidth since both thumbHeight and thumbWidth set to 'auto'
          expect( $(this).height() ).toEqual(expectedHeight);
        });
      });

      it('should be as wide as outer container', function() {
        var outerContainer = $gallery.parent().parent();
        expect( $gallery.width() ).toEqual(outerContainer.width());
      });
    });

    });
  });
  */

});


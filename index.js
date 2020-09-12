(function () {
  window.addEventListener("load", function () {
    var carouselViewport = document.querySelector(".carousel-viewport");
    var viewportWidth = carouselViewport.clientWidth;
    var imageReel = carouselViewport.querySelector(".image-reel");
    var idx = 0;

    carouselViewport.style.setProperty("height", viewportWidth + "px");
    var viewportHeight = viewportWidth;

    var imageItems = carouselViewport.querySelectorAll(".image-item");
    imageItems.forEach(function (item) {
      item.style.setProperty("flex-basis", viewportWidth + "px");
      item.style.setProperty("height", viewportHeight + "px");
    });

    setupNavigationListener();

    function moveToNext() {
      if (idx < imageItems.length - 1) {
        idx++;
        imageReel.style.setProperty("left", calcLeftOffset(idx, viewportWidth));
      }
    }

    function moveToPrev() {
      if (idx > 0) {
        idx--;
        imageReel.style.setProperty("left", calcLeftOffset(idx, viewportWidth));
      }
    }

    function calcLeftOffset(i, viewportWidth) {
      return 0 - i * viewportWidth + "px";
    }

    function setupNavigationListener() {
      document.addEventListener("click", function (ev) {
        var target = ev.target;

        if (target.hasAttribute("data-navigation-carousel")) {
          console.log("target", target);

          if (target.dataset.navigationCarousel === "next") {
            moveToNext();
          }

          if (target.dataset.navigationCarousel === "prev") {
            moveToPrev();
          }
        }
      });
    }
  });
})();

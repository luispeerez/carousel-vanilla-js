(function () {
  window.addEventListener("load", function () {
    var carouselViewport = document.querySelector(".carousel-viewport");
    var prevViewportwidth = carouselViewport.clientWidth;
    var imageReel = carouselViewport.querySelector(".image-reel");
    var thumbnailsReel = document.querySelector(".thumbnail-reel");
    var idx = 0;
    var maxThumbs = 3;
    var thumbnails = [];

    var imageItems = carouselViewport.querySelectorAll(".image-item");

    setupThumbnails(imageItems);
    setupNavigationListener();
    setSizes();
    setupResizeListener();

    function setSizes() {
      var viewportWidth = carouselViewport.clientWidth;
      var viewportHeight = viewportWidth;
      imageItems.forEach(function (item) {
        item.style.setProperty("flex-basis", viewportWidth + "px");
        item.style.setProperty("height", viewportHeight + "px");
      });

      var thumbWidth = calcThumbWidth();
      thumbnails.forEach(function (thumb) {
        thumb.style.setProperty("flex-basis", thumbWidth + "px");
      });
    }

    function setupThumbnails(items) {
      items.forEach(function (item, idx) {
        var imageEl = item.querySelector("img");
        var imgSrc = imageEl.getAttribute("src");
        var thumb = document.createElement("div");
        thumb.className = "thumbnail-item";
        thumb.setAttribute("data-image-idx", idx);

        var tImage = document.createElement("img");
        tImage.setAttribute("src", imgSrc);

        thumb.appendChild(tImage);

        thumbnailsReel.appendChild(thumb);
        thumbnails.push(thumb);
      });
    }

    function calcThumbWidth() {
      var width = carouselViewport.clientWidth;
      var thumbWidth = width / maxThumbs;
      return thumbWidth;
    }

    function moveToNext() {
      if (idx < imageItems.length - 1) {
        idx++;
      } else {
        idx = 0;
      }

      moveTo(idx);
    }

    function moveToPrev() {
      if (idx > 0) {
        idx--;
      } else {
        idx = imageItems.length - 1;
      }
      moveTo(idx);
    }

    function moveTo(moveToIdx) {
      if (moveToIdx >= 0 && moveToIdx < imageItems.length) {
        idx = moveToIdx;
        imageReel.style.setProperty(
          "left",
          calcLeftOffset(idx, carouselViewport.clientWidth)
        );
        thumbnailsReel.style.setProperty(
          "left",
          calcThumbnailsLeftOffset(idx, carouselViewport.clientWidth)
        );
      }
    }

    function calcLeftOffset(i, width) {
      return 0 - i * width + "px";
    }

    function calcThumbnailsLeftOffset(i) {
      var thumbWidth = calcThumbWidth();
      return 0 - i * thumbWidth + "px";
    }

    function calcThumbnailsLeftOffsetGroup(i, width) {
      var groupIdx = Math.floor(i / maxThumbs);
      return 0 - groupIdx * width + "px";
    }

    function setupResizeListener() {
      window.addEventListener("resize", function (ev) {
        var newViewportWidth = carouselViewport.clientWidth;
        if (newViewportWidth != prevViewportwidth) {
          setSizes();
          moveTo(idx);
          return;
        }

        if (newViewportWidth > prevViewportwidth)
          prevViewportwidth = newViewportWidth;
      });
    }

    function setupNavigationListener() {
      document.addEventListener("click", function (ev) {
        var target = ev.target;

        if (target.hasAttribute("data-navigation-carousel")) {
          if (target.dataset.navigationCarousel === "next") {
            moveToNext();
            return;
          }

          if (target.dataset.navigationCarousel === "prev") {
            moveToPrev();
            return;
          }
        }

        var thumbParent = target.closest(".thumbnail-item");
        if (thumbParent) {
          var thumbItem = thumbParent;
          var moveToIdx = parseInt(
            thumbItem.getAttribute("data-image-idx"),
            10
          );
          moveTo(moveToIdx);
          return;
        }

        if (target.hasAttribute("data-image-idx")) {
          var moveToIdx = parseInt(target.getAttribute("data-image-idx"), 10);
          moveTo(moveToIdx);
        }
      });
    }

    document.addEventListener("keydown", function (ev) {
      var LEFT_KEY_CODE = 37;
      var RIGHT_KEY_CODE = 39;

      if (ev.code === "KeyA" || ev.keyCode === LEFT_KEY_CODE) {
        moveToPrev();
        return;
      }

      if (ev.code === "KeyD" || ev.keyCode === RIGHT_KEY_CODE) {
        moveToNext();
        return;
      }
    });
  });
})();

(function () {
  window.addEventListener("load", function () {
    var carouselViewport = document.querySelector(".carousel-viewport");
    var viewportWidth = carouselViewport.clientWidth;
    var imageReel = carouselViewport.querySelector(".image-reel");
    var thumbnailsReel = document.querySelector(".thumbnail-reel");

    var idx = 0;
    var maxThumbs = 3;
    var thumbnails = [];

    //carouselViewport.style.setProperty("height", viewportWidth + "px");
    var viewportHeight = viewportWidth;

    var imageItems = carouselViewport.querySelectorAll(".image-item");
    imageItems.forEach(function (item) {
      item.style.setProperty("flex-basis", viewportWidth + "px");
      item.style.setProperty("height", viewportHeight + "px");
    });

    setupThumbnails(imageItems);
    setupNavigationListener();

    function setupThumbnails(items) {
      var thumbnails = [];
      var thumbWidth = calcThumbWidth();
      items.forEach(function (item, idx) {
        var imageEl = item.querySelector("img");
        var imgSrc = imageEl.getAttribute("src");
        var thumb = document.createElement("div");
        thumb.className = "thumbnail-item";
        thumb.setAttribute("data-image-idx", idx);
        thumb.style.setProperty("flex-basis", thumbWidth + "px");

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
        imageReel.style.setProperty("left", calcLeftOffset(idx, viewportWidth));
        thumbnailsReel.style.setProperty(
          "left",
          calcThumbnailsLeftOffset(idx, viewportWidth)
        );
      }
    }

    function calcLeftOffset(i, viewportWidth) {
      return 0 - i * viewportWidth + "px";
    }

    function calcThumbnailsLeftOffset(i) {
      var thumbWidth = calcThumbWidth();
      return 0 - i * thumbWidth + "px";
    }

    function calcThumbnailsLeftOffsetGroup(i, viewportWidth) {
      var groupIdx = Math.floor(i / maxThumbs);
      return 0 - groupIdx * viewportWidth + "px";
    }

    function setupNavigationListener() {
      /*
        document.addEventListener("contextmenu", function (ev) {
        console.log("ev", ev);
        ev.preventDefault();
      });
*/

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
          console.log(thumbItem);
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

    document.addEventListener("keypress", function (ev) {
      console.log("ev", ev);
      if (ev.code === "KeyA") {
        moveToPrev();
        return;
      }

      if (ev.code === "KeyD") {
        moveToNext();
        return;
      }
    });
  });
})();

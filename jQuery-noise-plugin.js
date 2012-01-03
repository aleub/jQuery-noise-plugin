$.fn.noise = function (options) {
  options = $.extend({
    opacity: 0.1,
    width: 45,
    height: 45,
    seed: 72,
    localstorage: true
  }, options);

  var canvas = document.createElement("canvas"),
  ctx = canvas.getContext('2d'),
  x,y,
  number;

  canvas.width = options.width;
  canvas.height = options.height;    

  if (options.localstorage  === false || (options.localstorage === true && (localStorage.getItem("bg_img") === null || localStorage.getItem("bg_img") === undefined ))) {
    for (x = 0; x < options.width; x++ ) {
      for ( y = 0; y < options.height; y++) {
        number = ~~( Math.random() * options.seed);
        ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + options.opacity + ")";
        ctx.fillRect(x, y, 1, 1);
      }
    }
    if (options.localstorage === true) {
      localStorage.setItem("bg_img", canvas.toDataURL("image/png"));
    }
  }

  return this.each(function () {
    //save image in local storage if available
    if (options.localstorage === true) {
      this.style.backgroundImage = "url(" + localStorage.getItem("bg_img") + ")";
    } else {
      this.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
    }
  });
};

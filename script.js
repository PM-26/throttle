const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

const centerElement = document.querySelector("#center");

centerElement.addEventListener(
  "mousemove",
  throttle((dets) => {
    var div = document.createElement("div");
    div.classList.add("imageDiv");
    div.style.left = dets.clientX + "px";
    div.style.top = dets.clientY + "px";

    var img = document.createElement("img");
    img.setAttribute("src","https://source.unsplash.com/random");
    div.appendChild(img);


    document.body.appendChild(div);

    gsap.to(img,{
      y:"0",
      ease:Power1,
      duration:.2
    })

    gsap.to(img,{
      y:"100%",
      delay:.6,
      ease:Power2,
    })
    
    
    setTimeout(function(){
      div.remove();
    },2000)
  }, 400)
);

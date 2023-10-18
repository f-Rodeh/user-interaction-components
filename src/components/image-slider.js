export { SliderComponent };

const init = () => {
  const sliderNodes = document.querySelectorAll(".image-slider");
  sliderNodes.forEach((node, index) => {
    const slider = HtmlSlider(node);
    sliderNodes[index].replaceWith(slider.build());
  });
};

const SliderComponent = {
  init,
};

const HtmlSlider = function GeneratedImageSliderFactory(node) {
  const looper = ImageLooper(node);

  const children = [...node.children];
  children.forEach((child) => {
    node.removeChild(child);
  });

  const build = () => {
    looper.start();
    return node;
  };

  return {
    build,
  };
};

function ImageLooper(parent) {
  let index = 0;
  const images = [...parent.children];

  images.forEach((img) => {
    img.style.width = "100%";
    img.style.height = "100%";
  });

  function start() {
    parent.append(images[index]);
    setInterval(() => {
      next();
    }, 5000);
  }

  function next() {
    index < images.length - 1 ? index++ : (index = 0);
    parent.replaceChild(images[index], parent.firstElementChild);
  }

  return {
    start,
  };
}

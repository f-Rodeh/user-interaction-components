export { SliderComponent };

const init = () => {
  const sliderNodes = document.querySelectorAll(".image-slider");
  sliderNodes.forEach((node, index) => {
    const slider = ImageSlider(node);
    sliderNodes[index].replaceWith(slider);
  });
};

const SliderComponent = {
  init,
};

const ImageSlider = (node) => {
  let index = 0;
  const length = node.children.length;
  const looper = ImageLooper(node);
  const indicator = SlideIndicator();

  looper.start();

  setInterval(() => {
    incrementIndex();
    looper.update(index);
    indicator.update(index);
  }, 5000);

  function incrementIndex() {
    index < length - 1 ? index++ : (index = 0);
  }

  return node;
};

const ImageLooper = (parent) => {
  const images = [...parent.children];

  images.forEach((img) => {
    img.style.width = "100%";
    img.style.height = "100%";
  });

  function start() {
    images.forEach((img) => parent.removeChild(img));
    parent.append(images[0]);
  }

  function update(index) {
    parent.replaceChild(images[index], parent.firstElementChild);
  }

  return {
    start,
    update,
  };
};

const SlideIndicator = () => {
  function update() {}
  return {
    update,
  };
};

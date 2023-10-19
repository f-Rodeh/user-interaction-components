export { SliderComponent };

const init = () => {
  const sliderNodes = document.querySelectorAll(".image-slider");
  sliderNodes.forEach((node, index) => {
    styleSlider(node);
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
  const indicator = SlideIndicator(node);

  node.firstElementChild.addEventListener("load", () =>
    setInterval(slideNext, 5000)
  );

  function slideNext() {
    console.log();
    incrementIndex();
    looper.update(index);
    indicator.update(index);
  }

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
    parent.removeChild(img);
    parent.append(images[0]);
  });

  function update(index) {
    parent.replaceChild(images[index], parent.firstElementChild);
  }

  return {
    update,
  };
};

const SlideIndicator = (parent, length) => {
  const root = document.createElement("div");
  styleIndicator(root);
  parent.append(root);

  function update() {}
  return {
    update,
  };
};

function styleSlider(slider) {
  slider.style.position = "relative";
}

function styleIndicator(indicator) {
  indicator.classList.add("image-slide-indicator");
  indicator.style.position = "absolute";
  indicator.style.bottom = "10%";
  indicator.style.left = "50%";
  indicator.style.transform = "translate(-50%, 0)";
}

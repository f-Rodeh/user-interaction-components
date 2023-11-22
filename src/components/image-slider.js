export { SliderComponent };
import "./image-slider.css";

const init = () => {
  const sliderNodes = document.querySelectorAll(".image-slider");
  sliderNodes.forEach((node, index) => {
    node.style.position = "relative";
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
  const indicator = SlideIndicator(node, length);

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
  root.classList.add("slider-navigation");
  parent.append(root);

  for (let i = 0; i < length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-navigation-cell");
    root.append(dot);

    dot.style.backgroundColor = root.computedStyleMap().get("color");
  }
  console.log(parent);
  console.log(parent.dataset);

  if (parent.dataset.noGradient) {
    root.style.backgroundImage = "none";
  }

  function update() {}
  return {
    update,
  };
};

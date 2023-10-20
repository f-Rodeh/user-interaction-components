export { SliderComponent };

const init = () => {
  const sliderNodes = document.querySelectorAll(".image-slider");
  sliderNodes.forEach((node, index) => {
    applyStyle(node, { position: "relative" });
    const slider = ImageSlider(node);
    sliderNodes[index].replaceWith(slider);
  });
};

const SliderComponent = {
  init,
};

const indicatorItem = {
  width: "1em",
  height: "0.33em",
  borderRadius: "1em",
  backgroundColor: "red",
};

const indicator = {
  position: "absolute",
  bottom: "1em",
  left: "50%",
  transform: "translate(-50%, 0)",
  display: "flex",
  gap: "0.8em",
  // backgroundColor: "gray", // TODO: remove
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
  applyStyle(root, indicator);
  parent.append(root);

  for (let i = 0; i < length; i++) {
    const dot = document.createElement("div");
    applyStyle(dot, indicatorItem);

    root.append(dot);
    console.log(dot.parentElement.computedStyleMap());
    dot.style.backgroundColor = dot.parentElement
      .computedStyleMap()
      .get("color");
  }

  function update() {}
  return {
    update,
  };
};

function styleSlider(slider) {
  // TODO: remove
  slider.style.position = "relative";
}

function applyStyle(target, styleObject) {
  Object.assign(target.style, styleObject);
}

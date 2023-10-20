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
};

const indicator = {
  boxSizing: "border-box",
  position: "absolute",
  bottom: "0",
  width: "100%",
  height: "14%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "0.8em",
  padding: "1em",
  backgroundImage:
    "linear-gradient(transparent, rgba(12,12,12,0.1), rgba(12,12,12,0.3), rgba(12,12,12,0.6))",
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

function applyStyle(target, styleObject) {
  Object.assign(target.style, styleObject);
}

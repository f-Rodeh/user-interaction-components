export {};
import "./image-slider.css";

document.querySelectorAll(".image-slider").forEach((slider) => {
  const s = ImageSlider(slider);
  slider.replaceWith(s.node);
});

function ImageSlider(node) {
  let index = 0;
  const imageManager = Images(node);
  const navigation = Navigation(node, imageManager.length);

  node.style.position = "relative";
  node.firstElementChild.addEventListener("load", () =>
    setInterval(slideNext, 5000)
  );

  function slideNext() {
    incrementIndex();
    imageManager.display(index);
    navigation.highlight(index);
  }

  function slidePrevious() {}

  function incrementIndex() {
    index < imageManager.length - 1 ? index++ : (index = 0);
  }

  return {
    index,
    node,
  };
}

function Images(parent) {
  const images = [...parent.children];
  const length = images.length;
  images.forEach((img) => {
    parent.removeChild(img);
    parent.append(images[0]);
  });

  function display(index) {
    parent.replaceChild(images[index], parent.firstElementChild);
  }

  return {
    display,
    length,
  };
}

function Navigation(parent, length) {
  const container = document.createElement("div");
  container.classList.add("slider-navigation");
  parent.append(container);

  for (let i = 0; i < length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-navigation-cell");
    dot.style.backgroundColor = container.computedStyleMap().get("color");
    container.append(dot);
  }

  if (parent.dataset.noGradient) {
    container.style.backgroundImage = "none";
  }

  function highlight(index) {
    container.childNodes.forEach((dot, i) => {
      dot.style.opacity = 0.5;
      if (i === index) dot.style.opacity = 1;
    });
  }

  return {
    highlight,
  };
}

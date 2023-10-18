export { SliderComponent }

const init = () => {
  const sliderNodes = document.querySelectorAll('.image-slider');
  sliderNodes.forEach((node, index) => {
    const slider = HtmlSlider(node);
    sliderNodes[index].replaceWith(slider.build())
  })
}

const SliderComponent = {
  init
}

const HtmlSlider = function GeneratedImageSliderFactory(node) {
  let currentSlide = 0;

  const images = [];
  const build = () => {
    node.style.display = 'flex'
    storeChildNodes();
    startSlider();
    return node;
  }

  function storeChildNodes() {
    const children = [...node.children];
    children.forEach(child => {
      images.push(child);
      node.removeChild(child);
    })
  }

  function startSlider() {
    display();
    setInterval(() => {
      next();
    }, 5000)
  }

  function next() {
    currentSlide < images.length - 1
      ? currentSlide++
      : currentSlide = 0;
    display();
  }

  function display() {
    const i = currentSlide;
    const previous = images.at(i - 1)
    const current = images.at(i)
    const next = images.at(i + 1) || images.at(0)

    previous.classList = current.classList = next.classList = []
    previous.classList.add('previous');
    next.classList.add('next');

    removeChildren(node);
    node.append(previous, current, next)
  }

  return {
    build
  }
}

function removeChildren(node) {
  while (node.firstElementChild) {
    node.removeChild(node.firstElementChild)
  }
}
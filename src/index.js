import { SliderComponent } from "./components/image-slider";
import "./components/image-slider.js";
import "./components/dropdown.js";
import "./style.css";
import { Dropdown } from "./components/dropdown.js";

const dropdown = Dropdown();
dropdown.appendItem("Index", "Created from the main file", "star");
document.body.append(dropdown.NodeElement);

export {};
import "./dropdown.css";

const ddButton = document.createElement("button");
ddButton.classList.add("r_dropdown");

const MaterialIcon = (name) => {
  const icon = document.createElement("span");
  icon.textContent = name;
  icon.classList.add("material-symbols-rounded");
  return icon;
};

const icon = MaterialIcon("more_vert");
const contentMenu = document.createElement("ul");
contentMenu.classList.add("r_dropdown_content_menu");
contentMenu.dataset.r_menu_visible = false;

const appendItem = (title, subtitle = "", MaterialIconName = null) => {
  const menuItem = document.createElement("li");
  const button = document.createElement("button");
  const _title = document.createElement("span");
  const textContent = document.createElement("span");
  const icon = MaterialIconName ? MaterialIcon(MaterialIconName) : "";

  _title.classList.add("r_menu_item_title");
  menuItem.append(button);
  menuItem.classList.add("r_menu_item");
  _title.textContent = title;

  button.addEventListener("click", () => {
    console.log(title, subtitle);
  });

  textContent.append(_title, subtitle);

  button.append(icon, textContent);
  contentMenu.append(menuItem);
};

appendItem("Just Title");
appendItem("Title", "And description");
appendItem("Icon", "", "star");
appendItem("Another one", "Icon followed by description", "home");

ddButton.addEventListener("click", toggleMenuVisibility);

function toggleMenuVisibility() {
  const state = contentMenu.dataset.r_menu_visible;
  contentMenu.dataset.r_menu_visible = state === "false" ? true : false;
}

ddButton.append(icon);

const Dropdown = () => {
  const component = document.createElement("div");
  component.append(ddButton, contentMenu); //TODO: replace with node COPIES, not the actual nodes;

  return component;
};

const testDropdown = Dropdown();
document.body.append(testDropdown);

const testElement = document.createElement("div");
testElement.classList.add("r_test_element");
document.body.append(testElement);

//TODO: Dismiss menu on click (outside of the menu);
//TODO: Test positioning of the menu;
//TODO: Add possibility of several dropdowns working independently;
//TODO: Add option to align menu to end instead of start

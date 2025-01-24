export { Dropdown };
import "./dropdown.css";

const ddButton = document.createElement("button");
ddButton.classList.add("r_dropdown_button");

const contentMenu = document.createElement("ul");
contentMenu.classList.add("r_dropdown_content_menu");

const MaterialIcon = (name) => {
  const icon = document.createElement("span");
  icon.textContent = name;
  icon.classList.add("material-symbols-rounded");
  return icon;
};

const icon = MaterialIcon("more_vert");
ddButton.append(icon);

const Item = (title, subtitle = "", MaterialIconName = null) => {
  const menuItem = document.createElement("li");
  const button = document.createElement("button");
  const _title = document.createElement("span");
  const textContent = document.createElement("span");
  const icon = MaterialIconName ? MaterialIcon(MaterialIconName) : "";

  _title.classList.add("r_menu_item_title");
  _title.textContent = title;
  menuItem.classList.add("r_menu_item");
  menuItem.append(button);

  button.addEventListener("click", () => {
    console.log(title, subtitle);
  });

  textContent.append(_title, subtitle);

  button.append(icon, textContent);
  return menuItem;
};

const toggleMenu = (component) => {
  const state = component.dataset.r_menu_visible;
  component.dataset.r_menu_visible = state === "false" ? true : false;
};

const Dropdown = () => {
  const component = document.createElement("span");
  component.classList.add("r_dropdown");
  component.dataset.r_menu_visible = false;

  const button = ddButton.cloneNode(true);
  const menu = contentMenu.cloneNode();

  function appendItem(title, subtitle = "", MaterialIconName = null) {
    const item = Item(title, subtitle, MaterialIconName);
    console.log(item, menu);
    menu.append(item);
  }

  button.addEventListener("click", () => toggleMenu(component));

  component.append(button, menu);
  return {
    NodeElement: component,
    appendItem,
  };
};

const testDropdown = Dropdown();
testDropdown.appendItem(
  "Dropdown",
  "Created from the component's file",
  "home"
);
document.body.append(testDropdown.NodeElement);

//TODO: Dismiss menu on click (outside of the menu);
//TODO: Add option to align menu to end instead of start

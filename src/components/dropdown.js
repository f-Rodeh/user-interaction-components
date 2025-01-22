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

appendItem("Hola", "saluda al dropdown", "check_box");
appendItem("Segundo veridis quo", "reproduce la cancion de Daft Punk", "star");

ddButton.append(icon);
document.body.append(ddButton, contentMenu);

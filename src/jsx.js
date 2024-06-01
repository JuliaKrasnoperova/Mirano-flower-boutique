export default function jsx(tag, attributes = {}, ...children) {
  attributes = attributes || {};
  if (typeof tag === "function") {
    return tag(attributes, ...children);
  }

  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "class") {
      element.classList.add(...value.trim().split(" "));
    } else if (key.startsWith("on") && key.toLocaleLowerCase() in window) {
      element.addEventListener(key.toLocaleLowerCase().substring(2), value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === "srting" || typeof child === "number") {
      element.append(document.createTextNode(child.toString()));
    } else if (Array.isArray(child)) {
      child.forEach((innerChild) => element.append(innerChild));
    } else {
      element.append(child);
    }
  });
  return element;
}

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach((items) => {
      this.addItem(this._renderer(items));
    });
  }

  addItem(cardElement, wrapper = "prepend") {
    if (wrapper === "prepend") {
      this._container.prepend(cardElement);
    } else if (wrapper === "append") {
      this._container.append(cardElement);
    }
  }
}

export default Section;

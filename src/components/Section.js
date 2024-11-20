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

  addItem(cardElement, method = "prepend") {
    this._container[method](cardElement);
  }
}

export default Section;

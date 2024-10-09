class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data, wrapper) {
    this._initialArray.forEach((data) => {
      this._renderer(data, wrapper);
    });
  }

  addItem(cardElement, wrapper = "prepend") {
    this._container[wrapper](cardElement);
  }
}

export default Section;

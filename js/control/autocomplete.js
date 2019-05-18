class autocomplete extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._placeholder = "Insert text here..";
    this._jsonvalue = "";
    this._data = null;
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>
    @import './css/components.css'
    </style>`;

    let container = document.createElement("div");
    let txtAutocomplete = document.createElement("input");
    let list = document.createElement("datalist");

    txtAutocomplete.setAttribute("placeholder", this.placeholder);
    txtAutocomplete.setAttribute("id", "txtAutocomplete");
    txtAutocomplete.setAttribute("list", "listAutocomplete");
    txtAutocomplete.setAttribute("part", "txtAutocomplete");

    list.setAttribute("id", "listAutocomplete");

    container.setAttribute("id", "autocomplete-container");

    container.appendChild(txtAutocomplete);
    container.appendChild(list);

    txtAutocomplete.addEventListener("input", ev => {
      txtAutocomplete.dispatchEvent(new CustomEvent('set-autocomplete', {
        detail: {
          value: ev.target.value
        },
        bubbles: true,
        composed: true
      }));
    });

    txtAutocomplete.addEventListener("keyup", ev => {
      txtAutocomplete.dispatchEvent(new CustomEvent('data-autocomplete', {
        detail: {
          value: this.jsonvalue,
          data: this.data
        },
        bubbles: true,
        composed: true
      }));
    });

    this._shadow.appendChild(container);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
        if (newValue.trim().length > 0) {
          this.placeholder = newValue;
          if (this._shadow.querySelector("#txtAutocomplete") != null) {
            this._shadow.querySelector("#txtAutocomplete").placeholder = newValue;
          }
        }
        break;
      case 'jsonvalue':
        this.jsonvalue = newValue;
        break;
    }

  }

  static get observedAttributes() {
    return ['placeholder', 'jsonvalue'];
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  get jsonvalue() {
    return this._jsonvalue;
  }

  set jsonvalue(value) {
    this._jsonvalue = value;
  }

}

if (!(window.customElements && document.body.attachShadow)) {
  document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
  window.customElements.define('sc-autocomplete', autocomplete);
}

export default autocomplete;
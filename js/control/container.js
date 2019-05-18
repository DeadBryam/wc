class container extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._container;
    }

    connectedCallback() {

        let div = document.createElement("div");
        div.id = "container";
        div.innerHTML = '<slot></slot>';
        this._shadow.appendChild(div);

        document.addEventListener("data-autocomplete", ev => {
            if (ev.detail.data != null) {
                ev.detail.data.then(r => {
                    if (Array.isArray(r)) {
                        ev.target._shadow.querySelector("datalist").innerHTML = r.map(a => {
                            return `<option value="${a[ev.detail.value]}">`
                        }).join('');
                    } else {
                        ev.target._shadow.querySelector("datalist").innerHTML = "";
                    }

                });
            }
        });

    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }

}

if (!(window.customElements && document.body.attachShadow)) {
    document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
    window.customElements.define('sc-container', container);
}

export default container;
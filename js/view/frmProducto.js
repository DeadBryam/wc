import scissors from '../control/scissors.js';
import productoMD from '../model/ProductosMD.js';

class frmProducto {
    constructor() {
        this.producto = new productoMD();
        this.init();
    }

    init() {
        document.querySelector("#autocomplete-ciudad")
        .addEventListener('set-autocomplete', ev => {
            if(ev.detail.value.trim().length === 0){
                ev.detail.value = "$^";
            }
            ev.target.data = this.obtenerOrigen(`?departamento_like=${ev.detail.value}`);
        });
    }

    obtenerOrigen(action = "") {
        try {
            const r = this.producto.getProductos(action);
            return r;
        }
        catch (e) {
            return e;
        }
    }
}

new frmProducto();
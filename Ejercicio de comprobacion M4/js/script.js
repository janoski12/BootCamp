class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        for(let i = 0; i < cantidad; i++) {
            this.productos.push(producto);
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarDetalles() {
        const detalles = {};
        this.productos.forEach(producto => {
            if (!detalles[producto.nombre]) {
                detalles[producto.nombre] = { cantidad: 0, precio: producto.precio };
            }
            detalles[producto.nombre].cantidad += 1;
        });

        let detallesStr = 'Detalles de la compra:\n';
        for (let [nombre, info] of Object.entries(detalles)) {
            detallesStr += `${nombre} - Cantidad: ${info.cantidad}, Precio Unitario: $${info.precio}\n`;

        }

        return detallesStr;
    }

    finalizarCompra() {
        const total = this.calcularTotal();
        return `Compra finalizada. El total es $${total}`;
    }
}
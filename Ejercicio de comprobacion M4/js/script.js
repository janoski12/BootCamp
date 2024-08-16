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

const productosDisponibles = [
    new Producto('Pan', 1500),
    new Producto('Leche', 1800),
    new Producto('Huevos', 650)
];

const carrito = new Carrito();

function iniciarCompra() {
    let seguirComprando = true;

    while (seguirComprando) {
        const listaProductos = productosDisponibles.map((p, index) => `${index + 1}. ${p.nombre} - $${p.precio}`).join('\n');
        const seleccion = parseInt(prompt(`Selecciona un producto:\n${listaProductos}`)) - 1;
        const productoSeleccionado = productosDisponibles[seleccion];

        if (productoSeleccionado) {
            const cantidad = parseInt(prompt(`¿Cuantas unidades de ${productoSeleccionado.nombre} deseas comprar?`));
            carrito.agregarProducto(productoSeleccionado, cantidad);
            alert(`Has agregado ${cantidad} unidad(es) de ${productoSeleccionado.nombre} al carrito.`);

            seguirComprando = confirm("¿Deseas agregar mas productos?");
        } else {
            alert("Selección invalida, intenta nuevamente.");
        }
    }

    alert(carrito.mostrarDetalles());
    alert(carrito.finalizarCompra());

}

iniciarCompra();
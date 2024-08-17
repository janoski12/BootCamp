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
        for (let i = 0; i < cantidad; i++) {
            this.productos.push(producto);
        }
        this.actualizarTotal();
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

        return detalles;
    }

    actualizarTotal() {
        const total = this.calcularTotal();
        document.getElementById('total-compra').textContent = total.toFixed(2);
    }

    finalizarCompra() {
        const total = this.calcularTotal();
        alert(`Compra finalizada. El total es $${total}`);
        this.productos = [];
        this.mostrarCarrito();
        this.actualizarTotal();
    }

    mostrarCarrito() {
        const carritoLista = document.getElementById('carrito');
        carritoLista.innerHTML = '';

        const detalles = this.mostrarDetalles();
        for (let [nombre, info] of Object.entries(detalles)) {
            const item = document.createElement('li');
            item.classList.add('list-group-item');
            item.textContent = `${nombre} - Cantidad: ${info.cantidad}, Precio: $${info.precio}`;
            carritoLista.appendChild(item);
        }
    }
}

const productosDisponibles = [
    new Producto('Pan', 1500),
    new Producto('Leche', 1800),
    new Producto('Huevos', 650)
];

const carrito = new Carrito();

function cargarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    productosDisponibles.forEach((producto, index) => {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = `${producto.nombre} - $${producto.precio}
            <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${index})">Agregar</button>`;
        listaProductos.appendChild(item);
    });
}

function agregarAlCarrito(index) {
    const cantidad = parseInt(prompt(`¿Cuantas unidades de ${productosDisponibles[index].nombre} deseas agregar?`));
    if (cantidad > 0) {
        carrito.agregarProducto(productosDisponibles[index], cantidad);
        carrito.mostrarCarrito();
    } else {
        alert("Por favor, ingresa una cantidad valida.");
    }
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    carrito.finalizarCompra();
});

cargarProductos();
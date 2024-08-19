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
        this.productos.push({ producto, cantidad});
    }

    calcularTotal() {
        return this.productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0).toFixed(2);
    }

    mostrarCarrito() {
        const carritoElement = document.getElementById('carrito');
        carritoElement.innerHTML = '';
        this.productos.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
                <div>
                    ${item.producto.nombre} (x${item.cantidad}) - $${(item.producto.precio * item.cantidad).toFixed(2)}
                </div>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            carritoElement.appendChild(li);
        });
        document.getElementById('total-compra').textContent = this.calcularTotal();
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.mostrarCarrito();
    }

    finalizarCompra() {
        if (this.productos.length > 0) {
            alert(`Compra finalizada. Total: $${this.calcularTotal()}`);
            this.productos = [];
            this.mostrarCarrito();
        } else {
            alert('El carrito está vacío.');
        }
    }
}

const carrito = new Carrito();

const productosDisponibles = [
    new Producto('Pan x kg', 1500),
    new Producto('Quequito', 2500),
    new Producto('Leche', 1800),
    new Producto('Huevos', 650)
];


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

let productoSeleccionadoIndex = null;

function agregarAlCarrito(index) {
    productoSeleccionadoIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('cantidadModal'));
    modal.show();
}

document.getElementById('confirmarCantidad').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadInput').value);
    if (cantidad > 0) {
        carrito.agregarProducto(productosDisponibles[productoSeleccionadoIndex], cantidad);
        carrito.mostrarCarrito();
        const modal = bootstrap.Modal.getInstance(document.getElementById('cantidadModal'));
        modal.hide();
    } else {
        alert("Por favor, ingresa una cantidad válida.");
    }
});

function eliminarProducto(index) {
    carrito.eliminarProducto(index);
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    carrito.finalizarCompra();
});

window.onload = cargarProductos;
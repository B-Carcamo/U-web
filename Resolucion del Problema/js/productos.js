import { funciones } from "./funciones.js";

let eventos = new funciones();
let productos;
let SumaTotal;
const baseDatos = [];

window.onload = function () {
  productos = eventos.listarProductos();
  previewList();
};

function previewList() {
  const cuerpo = document.querySelector("#listProd tbody");
  cuerpo.innerHTML = "";

  productos.forEach((element) => {
    cuerpo.innerHTML += `
        <tr>
        <th scope="row">${element.id}</th>
        <td><img style="width: 60px; height: 50px;" src=" ${element.imagen} "></td>
        <td>${element.descripcion}</td>
        <td>${element.costo}</td>
        <td id="inv${element.id}">${element.inventario}</td>
        <td>${element.expiracion}</td>
        <td><input class="form-control text-center input-number" type="number" min=0 id="C${element.id}" value="0"></td>
        <td><button onclick="comprar(${element.id})" type="button" class="btn btn-warning  "><img style="width: 24px; height: 24px;" src="../img/cart.svg"/></button></td>
      </tr>
        `;
  });
}

function comprar(id) {
  const tagId = "C" + id;
  const alerta = document.getElementById("Alerta");
  const cantidad = document.getElementById(tagId);

  if (cantidad.value <= 0) {
    eventos.mensaje(alerta, id, "Compras a Cero o Menor");
  } else if (cantidad.value > productos[id - 1].inventario) {
    eventos.mensaje(alerta, id, "Compras mayor al inventario");
  } else {
    AgregarCompra(id, cantidad);
  }
}

function AgregarCompra(id, cantidad) {
  // Id celda inventario de la tabla
  const tagInv = "inv" + id;
  //Descripcion del producto
  const descripcion = productos[id - 1].descripcion;
  //Costo del producto
  const costo = productos[id - 1].costo;
  // calculo del subtotal
  const subtotal = cantidad.value * costo;

  const descuento = 0;
  // calculo del iva
  const iva = Number((subtotal + subtotal * 0.13 - descuento).toFixed(2));
  // se hace una nueva instancia de la funcion articulos con sus propiedades
  const nuevoArticulos = new eventos.articulos(
    cantidad.value,
    descripcion,
    costo,
    subtotal,
    descuento,
    iva
  );
  // se agrega a la array de pedido
  baseDatos.push(nuevoArticulos);

  const celdaInv = document.getElementById(tagInv);

  celdaInv.innerText = productos[id - 1].inventario -= cantidad.value; // Disminuye el inventario Disponible del producto

  cantidad.value = 0;
  facturar();
}

function facturar() {
  const cuerpo = document.querySelector("#listPedido tbody");
  cuerpo.innerHTML = "";

  const total_compras = eventos.comprasTotal(baseDatos);

  if (total_compras > 5) {
    const descuento_total = eventos.descuentoAndTotal(baseDatos);
    const factura = eventos.previsualizar(baseDatos, descuento_total);
    cuerpo.innerHTML = factura;
    SumaTotal = descuento_total;
  } else {
    const total_sinDesc = eventos.TotalSinDescuento(baseDatos);
    const factura2 = eventos.previsualizar(baseDatos, total_sinDesc);
    cuerpo.innerHTML = factura2;
    SumaTotal = total_sinDesc;
  }
}

function enviarPedido() {
  const alerta = document.getElementById("Alerta2");
  const cuerpo = document.querySelector("#listPedido tbody");

  cuerpo.innerHTML = "";

  alerta.innerHTML =
    "El pedido por el monto " + SumaTotal.toFixed(2) + " ha sido enviado";
  alerta.style.display = "block";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 3500);
}

function Salir() {
  location.href = "../index.html";
}

// Global Functions
window.comprar = comprar;
window.enviarPedido = enviarPedido;
window.Salir = Salir;

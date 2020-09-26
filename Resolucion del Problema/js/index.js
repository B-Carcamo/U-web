import { funciones } from "./funciones.js";

const eventos = new funciones()

const btnIngresar = document.getElementById("btnIngresar");
const btnClose = document.getElementById("btnclose");

btnIngresar.addEventListener("click", ingresar);
btnClose.addEventListener("click", cerrar);

function ingresar() {
  const cedula = document.getElementById("cedula");
  const notificacion = document.getElementById("Alerta");
  const mensaje = document.getElementById("mensaje");
  const cedf = document.getElementById("optionsCedF");

  const validar = eventos.validCedula(cedf, cedula.value);

  validar
    ? (location.href = "pages/productos.html")
    : ((notificacion.style.display = "block"),
      (mensaje.innerText =
        "Formato Invalido, Fisica = 01-0311-0322 y Juridica: 3-0322-032245"));
}

function cerrar() {
  const notificacion = document.getElementById("Alerta");
  notificacion.style.display = "none";
}

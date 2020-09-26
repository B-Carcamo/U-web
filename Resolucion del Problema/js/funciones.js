export  class funciones {
  constructor() {}

  validCedula(fisica, cedula) {
    let regexF = /^0\d{1}-\d{4}-\d{4}$/; // cedula fisica
    let regexJ = /^\d{1}-\d{4}-\d{6}$/; // cedula juridica
    let validar = true;

    fisica.checked
      ? regexF.test(cedula)
        ? (validar = true)
        : (validar = false)
      : regexJ.test(cedula)
      ? (validar = true)
      : (validar = false);

    return validar;
  }

  listarProductos() {
    const productos = [
      {
        id: 1,
        imagen: "../img/productos/aguacate.png",
        descripcion: "Aguacate Hass por Kilo",
        costo: 2150,
        inventario: 10,
        expiracion: "23/07/2020",
      },
      {
        id: 2,
        imagen: "../img/productos/camote.png",
        descripcion: "Camote precio por Kilo",
        costo: 600,
        inventario: 19,
        expiracion: "24/07/2020",
      },
      {
        id: 3,
        imagen: "../img/productos/chayote.png",
        descripcion: "Chayote Blanco por Unidad",
        costo: 350,
        inventario: 25,
        expiracion: "18/07/2020",
      },
      {
        id: 4,
        imagen: "../img/productos/coliflor.png",
        descripcion: "Coliflor precio por Unidad",
        costo: 600,
        inventario: 16,
        expiracion: "16/07/2020",
      },
      {
        id: 5,
        imagen: "../img/productos/elote.png",
        descripcion: "Maiz Dulce por Unidad",
        costo: 125,
        inventario: 60,
        expiracion: "20/07/2020",
      },
      {
        id: 6,
        imagen: "../img/productos/papa.png",
        descripcion: "Papa Blanca por Kilo",
        costo: 600,
        inventario: 30,
        expiracion: "18/07/2020",
      },
      {
        id: 7,
        imagen: "../img/productos/platano.png",
        descripcion: "Platano en Bolsa de 2 Unidades",
        costo: 250,
        inventario: 20,
        expiracion: "23/07/2020",
      },
      {
        id: 8,
        imagen: "../img/productos/repollo.png",
        descripcion: "Repollo Verde por Unidad",
        costo: 350,
        inventario: 9,
        expiracion: "21/07/2020",
      },
      {
        id: 9,
        imagen: "../img/productos/tomate.png",
        descripcion: "Tomate Organico por Kilo",
        costo: 1000,
        inventario: 18,
        expiracion: "18/07/2020",
      },
      {
        id: 10,
        imagen: "../img/productos/yuca.png",
        descripcion: "Yuca Parafinada por Kilo",
        costo: 400,
        inventario: 22,
        expiracion: "19/07/2020",
      },
    ];

    return productos;
  }

  // Validaciones de entrada de cantidad

  validarCero(inputC) {
    // validad que no se realize compras menor a 0
    let validar = false;
    inputC.value <= 0 ? (validar = true) : (validar = false);
    return validar;
  }

  validarinv(inputC, inventario) {
    let validar = false;
    inputC.value > inventario ? (validar = true) : (validar = false);
  }

  mensaje(alerta, id, mensaje) {
    alerta.innerHTML = "Error ID " + id + " -> " + mensaje;
    alerta.style.display = "block";
    setTimeout(function () {
      alerta.style.display = "none";
    }, 2500);
  }

  articulos = function (Cant, Desp, Pre, Sub, Des, Iva) {
    this.Cant = Cant; // cantidad
    this.Desp = Desp; // descripción
    this.Pre = Pre; // precio
    this.Sub = Sub; // subtotal
    this.Des = Des; // descuento
    this.Iva = Iva; // iva
  };

  comprasTotal(basedatos) {
    let total_compra = 0;

    basedatos.forEach((element)=>{
      total_compra += Number(element.Cant);   
    })

    return total_compra;
  }

  descuentoAndTotal(basedatos) {
    let total = 0;


    basedatos.forEach((element)=>{
      let subtotal = element.Sub; // se obtiene el total de cada producto comprado
      let descuento = (element.Des = Number(
        subtotal - (subtotal * 0.05).toFixed(2)
      )); // se calcula el descuento y se agrega
      total += element.Iva = Number(
        (descuento + descuento * 0.13).toFixed(2)
      );
    })

    return total;
  }

  TotalSinDescuento(basedatos) {

    let total = 0;
    basedatos.forEach((element)=>{
      total += Number((element.Iva).toFixed(2))  
    })

    return total;
  }


  previsualizar(basedatos, total) {
    let info = "";

    basedatos.forEach((element) => {
      info += `
      
      <tr>
      <td>${element.Cant}</td>
      <td>${element.Desp}</td>
      <td>${element.Pre}</td>
      <td>${element.Sub}</td>
      <td>${element.Des}</td>
      <td>${element.Iva}</td>
      </tr>
      
      `;
    });

    info +=`
    <tr>
     <td style="font-weight: bold;" >TOTAL</td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td style="font-weight: bold;" >${total.toFixed(2)}</td>
    </tr>
    
    `

    return info
  }
}



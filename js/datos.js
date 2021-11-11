var cantidad1=0;
var cantidad2=0;
var cantidad3=0;
var cantidad4=0;
var cantidad5=0;
var cantidad6=0;
var cantidad7=0;

var almacen = new Array();
var contador = 0;
var pos = 0;
var totalpedido = 0;
class articluoAlmacen {
  constructor(
    codigo,
    descripcion,
    tipo,
    direccion,
    latitud,
    longitud,
    precio,
    duracion
  ) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.precio = precio;
    this.duracion = duracion;
  }
  leerRegistro() {
    return this;
  }
}

class pedido{
  constructor(
    Contacto,
    Telefono,
    Email,
    Fecha_solicitud,
    Cantidad_servicio1,
    Cantidad_servicio2,
    Cantidad_servicio3,
    Cantidad_servicio4,
    Cantidad_servicio5,
    Cantidad_servicio6,
    Cantidad_servicio7,
    Importe_total)
    {
    this.Contacto= Contacto;
    this.Telefono= Telefono;
    this.Email= Email;
    this.Fecha_solicitud= Fecha_solicitud;
    this.Cantidad_servicio1= Cantidad_servicio1;
    this.Cantidad_servicio2= Cantidad_servicio2;
    this.Cantidad_servicio3= Cantidad_servicio3;
    this.Cantidad_servicio4= Cantidad_servicio4;
    this.Cantidad_servicio5= Cantidad_servicio5;
    this.Cantidad_servicio6= Cantidad_servicio6
    this.Cantidad_servicio7= Cantidad_servicio7;
    this.Importe_total= Importe_total;
  }
}

function generarTabla(evt) {
  var cuerpoa = document.querySelector("#cuerpoServicios");
  cuerpoa.innerHTML = "";
  var iFamilia = 0;
  if (FamiliaSeleccionada.value != "") {
    var iFamilia = parseInt(FamiliaSeleccionada.value);
  }

  myDBInstance.transaction(function (tran) {
    tran.executeSql("SELECT * FROM servicios", [], function (tran, data) {
      for (i = 0; i < data.rows.length; i++) {
        registroArticulo = new articluoAlmacen(
          data.rows[i].id,
          data.rows[i].Descripcion,
          data.rows[i].Tipo,
          data.rows[i].Direccion,
          data.rows[i].Latitud,
          data.rows[i].Longitud,
          data.rows[i].Precio,
          data.rows[i].Duracion
        );

        if (iFamilia == registroArticulo.tipo || iFamilia == 0) {
          linea = document.createElement("tr");
          botonId = document.createElement("button");
          // En el atributo  del button creado paso el artículo seleccionado pedido
          botonId.registro = registroArticulo;
          botonId.addEventListener("click", VentaArtuiculo, false)
          dato = document.createTextNode(registroArticulo.codigo);
          botonId.appendChild(dato);
          Columna = document.createElement("td");
          Columna.appendChild(botonId);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.descripcion);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.precio);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.duracion);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.direccion);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          cuerpoa.appendChild(linea);
        }
      }
    });
  });
}

function VentaArtuiculo(event) {
  // posicionIndice = this.alt;
  // alert(this.getAttribute("precioArticulo"));
  var articuloventa = this.registro; //new objetoArticulo();
  //  alert(articuloventa.precio)
  // articuloventa = almacen[posicionIndice];
  // alert(articuloventa.nombre)

  var cuerpop = document.querySelector("#cuerpoPedido");

  linea = document.createElement("tr");

  botonId = document.createElement("button");
  // En el atributo  del button creado paso el artículo seleccionado pedido
  botonId.registro = articuloventa;
  botonId.articulo=articuloventa;
  botonId.addEventListener("click", visualizaMapa, false)
  dato = document.createTextNode(articuloventa.codigo);
  botonId.appendChild(dato);
  Columna = document.createElement("td");
  Columna.appendChild(botonId);
  linea.appendChild(Columna);

  dato = document.createTextNode(articuloventa.descripcion);
  Columna = document.createElement("td");
  Columna.appendChild(dato);
  linea.appendChild(Columna);

  parrafo = document.createElement("p");
  dato = document.createTextNode(articuloventa.precio);
  Columna = document.createElement("td");
  Columna.appendChild(dato);
  linea.appendChild(Columna);

  ccantidad = document.createElement("input");
  ccantidad.registro = articuloventa;
  ccantidad.id = "c";
  Columna = document.createElement("td");
  Columna.appendChild(ccantidad);
  ccantidad.addEventListener("keyup", calculoimporte, false);
  linea.appendChild(Columna);

 

  pimporte = document.createElement("input");
  pimporte.disabled = true;
  pimporte.value = 0;
  Columna = document.createElement("td");
  Columna.appendChild(pimporte);
  linea.appendChild(Columna);

  cuerpop.appendChild(linea);
  cargarMapa(articuloventa.latitud,articuloventa.longitud);
  event.target.removeEventListener("click",VentaArtuiculo,false);


}



function calculoimporte() {
    // var articulos_venta=new Array();
    articuloventa = this.registro;
    var precio = articuloventa.precio;
    var cantidad = this.value
    var importeLinea = parseFloat(precio) * parseFloat(cantidad);

    var lineaPadre = this.parentElement.parentElement;
   
    var hijosVentaPedido = lineaPadre.childNodes;
   
    var importelinea = hijosVentaPedido[4].firstChild;

    var importeAnterior = parseFloat(importelinea.value);
    importelinea.value = importeLinea
    if (isNaN(importelinea.value)) {
        importelinea.value = '0';
    }
    if (isNaN(totalpedido)) {
        totalpedido = 0;
    }
    totalpedido = totalpedido + importeLinea - importeAnterior;
    var ctotal = document.querySelector("#total");
    ctotal.value = totalpedido;

    switch (articuloventa.codigo){
      case '1':{
        cantidad1=this.value;
        break;
      }
      case '2':{
        cantidad2=this.value;
        break;
      }
      case '3':{
        cantidad3=this.value;
        break;
      }
      case '4':{
        cantidad4=this.value;
        break;
      }
      case '5':{
        cantidad5=this.value;
        break;
      }
      case '6':{
        cantidad6=this.value;
        break;
      }
      case '7':{
        cantidad7=this.value;
        break;
      }
    }

}


function grabarPedido(){
 // tran.executeSql('INSERT INTO  Pedidos (id_pedido , Contacto ,Telefono,Email , Fecha_solicitud, Cantidad_servicio1 ,Cantidad_servicio2,Cantidad_servicio3,Cantidad_servicio4,Cantidad_servicio5,Cantidad_servicio6,Cantidad_servicio7,Importe_total ) values (1, "Gabriel","679859164","gabriel@gmail.com","10/11/2021",1,1,1,1,1,1,1,315)');
//  alert(cantidad1);
//  alert(cantidad2);
//  alert(cantidad3);
//  alert(cantidad4);
//  alert(cantidad5);
//  alert(cantidad6);
//  alert(cantidad7);


 registroPedido=new pedido(
    contacto.value,
    Teléfono.value,
    Email.value,
    fechaDesde.value,
    cantidad1,
    cantidad2,
    cantidad3,
    cantidad4,
    cantidad5,
    cantidad6,
    cantidad7,
    total.value
  )

  
  myDBInstance.transaction(function (tran) {
    tran.executeSql('INSERT INTO  Pedidos (Contacto ,Telefono,Email , Fecha_solicitud, Cantidad_servicio1 ,Cantidad_servicio2,Cantidad_servicio3,Cantidad_servicio4,Cantidad_servicio5,Cantidad_servicio6,Cantidad_servicio7,Importe_total ) values \n\
    ("'+registroPedido.Contacto+'","'+registroPedido.Telefono+'","'+registroPedido.Email+'","'+registroPedido.Fecha_solicitud+'",'+registroPedido.Cantidad_servicio1+','+registroPedido.Cantidad_servicio2+','+registroPedido.Cantidad_servicio3+','+registroPedido.Cantidad_servicio4+','+registroPedido.Cantidad_servicio5+','+registroPedido.Cantidad_servicio6+','+registroPedido.Cantidad_servicio7+','+registroPedido.Importe_total+')');

  });
 
}
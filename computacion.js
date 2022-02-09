let botonNuevaVenta = document.querySelector("#btn-ventas");
let agregar = document.querySelector(".agregar-venta");
let overlay = document.querySelector("#overlay");
let botonCancelar = document.querySelector(".btn-cancelar");
/* funciones para modales */
botonNuevaVenta.addEventListener("click", () =>{
   agregar.classList.remove("oculto")
   overlay.classList.remove("oculto")
})
botonCancelar.addEventListener("click", () =>{
    agregar.classList.add("oculto")
    overlay.classList.add("oculto")
})




const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"]

const ventas = [
    [
        1,
        new Date(2019, 1, 4),
        "Grace",
        "Centro",
        ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
    ],
    [
        2,
        new Date(2019, 0, 1),
        "Ada",
        "Centro",
        ["Monitor GPRS 3000", "Motherboard ASUS 1500"]
    ],
    [
        3,
        new Date(2019, 0, 2),
        "Grace",
        "Caballito",
        ["Monitor ASC 543", "Motherboard MZI"]
    ],
    [
        4,
        new Date(2019, 0, 10),
        "Ada",
        "Centro",
        ["Monitor ASC 543", "Motherboard ASUS 1200"]
    ],
    [
        5,
        new Date(2019, 0, 12),
        "Grace",
        "Caballito",
        ["Monitor GPRS 3000", "Motherboard ASUS 1200"]
    ]
]

const precios = [
    ["Monitor GPRS 3000", 200],
    ["Motherboard ASUS 1500", 120],
    ["Monitor ASC 543", 250],
    ["Motherboard ASUS 1200", 100],
    ["Motherboard MZI", 30],
    ["HDD Toyiva", 90],
    ["HDD Wezter Dishital", 75],
    ["RAM Quinston", 110],
    ["RAM Quinston Fury", 230]
]




let botonNuevaVenta = document.querySelector("#btn-ventas");
let agregar = document.querySelector(".agregar-venta");
let overlay = document.querySelector("#overlay");
let botonCancelar = document.querySelector(".btn-cancelar");
/* funciones para modales */
botonNuevaVenta.addEventListener("click", () => {
    agregar.classList.remove("oculto")
    overlay.classList.remove("oculto")
})
botonCancelar.addEventListener("click", () => {
    agregar.classList.add("oculto")
    overlay.classList.add("oculto")
})


//traer los datos de array precargado
let tablaVentas = document.getElementById("table-ventas")
let crearTablaDeVentas = () => {
    for (let i = 0; i < ventas.length; i++) {
        let crearFilas = document.createElement("tr")

        for (let z = 0; z < ventas[i].length; z++) {
            crearFilas.innerHTML = `<td>${ventas[i][1]}</td>
            <td>${ventas[i][2]}</td>
            <td>${ventas[i][3]}</td>
            <td>${ventas[i][4]}</td>
            <td>${ventas[i][6]}<i class="fas fa-pencil"></i></td>
            <td>${ventas[i][6]}<i class="fas fa-trash"></i></td>
            `
            //por que sale undefined?
        }
        tablaVentas.appendChild(crearFilas)
    }

}

crearTablaDeVentas()

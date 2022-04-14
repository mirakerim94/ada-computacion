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
    for (let i = 0; i < local.ventas.length; i++) {
        let crearFilas = document.createElement("tr")
        crearFilas.innerHTML = 
        `<td>${local.ventas[i].fecha.toLocaleDateString("es-ES")}</td>
        <td>${local.ventas[i].nombreVendedora}</td>
        <td>${local.ventas[i].sucursal}</td>
        <td>${local.ventas[i].componentes}</td>
        <td>${precioMaquina(local.ventas[i].componentes)}</td>
        <td><button id="pencil"><i class="fas fa-pencil"></i></button>
        <button id="trash"><i class="fas fa-trash"></i></button></td>
        `
        tablaVentas.appendChild(crearFilas)
    }

}

crearTablaDeVentas()

//Funciones
//1)precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

function precioMaquina (componentes) {
   let acc = 0
    componentes.map(componente => {
        //me devuelva componentes que pido
        //console.log(componente)
        local.precios.filter(precio => {
            if (componente === precio.componente)
                return acc += precio.precio
            //console.log(acc)
        })

    })
    return acc

}
//console.log(precioMaquina(["Monitor GPRS 3000", "HDD Toyiva", "RAM Quinston", "Motherboard ASUS 1200"]))

//2)cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas
const cantidadVentasComponente = (componente) => {
    let acc = 0
    //me devuelve el array de objetos de ventas
    local.ventas.map(venta => {
        //filtro el array de componentes
        venta.componentes.filter(producto => {
            //console.log(producto)
            if (componente === producto) {
                //console.log(componente)
                return acc++
            }

        })
    })
    return acc
}

//console.log(cantidadVentasComponente("Motherboard MZI"))

//3)vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).


const vendedoraDelMes = (mes, anio) => {
    let ventasPorFecha = local.ventas.filter(venta => {
        //console.log(venta.fecha.getMonth()+1)
        //console.log(venta.fecha.getFullYear())
        if (mes === (venta.fecha.getMonth() + 1) && anio === venta.fecha.getFullYear()) {
            return venta
        }
    })

    let Grace = 0
    let Ada = 0
    let Sheryl = 0
    let Hedy = 0

    ventasPorFecha.map(venta => {
        switch (true) {
            case venta.nombreVendedora === "Ada":
                Ada += precioMaquina(venta.componentes)
                break
            case venta.nombreVendedora === "Grace":
                Grace += precioMaquina(venta.componentes)
                break
            case venta.nombreVendedora === "Sheryl":
                Sheryl += precioMaquina(venta.componentes)
                break
            case venta.nombreVendedora === "Hedy":
                Hedy += precioMaquina(venta.componentes)
                break
        }
    })

    let mejorVendedora = ""


    if (Ada > Grace && Ada > Sheryl && Ada > Hedy) {
        mejorVendedora = "Ada"
    } else if (Hedy > Grace && Hedy > Sheryl && Hedy > Ada) {
        mejorVendedora = "Hedy"
    } else if (Sheryl > Grace && Sheryl > Hedy && Sheryl > Ada) {
        mejorVendedora = "Sheryl"
    } else {
        mejorVendedora = "Grace"
    }

    return mejorVendedora
}
//console.log(vendedoraDelMes(1, 2019))

//4)ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const ventasMes = (mes, anio) => {
    let acc = 0
    local.ventas.filter(venta => {
        //console.log(venta)
        if (mes === (venta.fecha.getMonth() + 1) && anio === venta.fecha.getFullYear()) {
            //console.log(precioMaquina(venta.componentes))
            return acc += precioMaquina(venta.componentes)
        }
    })
    //console.log(ventasDelMes)
    return acc
}

//console.log(ventasMes(2, 2019))

//5)ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
    let acc = 0
    local.ventas.map(venta => {
        //console.log(venta)
        if (venta.nombreVendedora === nombre) {
            //console.log(venta.componentes)
            return acc += precioMaquina(venta.componentes)
        }
    })
    return acc
}
//console.log(ventasVendedora("Sheryl"))

//6)componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
local.ventas.map(venta => {
//console.log(venta)

})
}

//console.log(componenteMasVendido())

//7)huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const huboVentas = (mes, anio) => {
let {ventas} = local 
let huboVentas = ventas.some(venta => {
    //console.log(venta.fecha)
    if(mes === venta.fecha.getMonth() + 1 && anio === venta.fecha.getFullYear()){
        //console.log(venta)
        return true
    }
})
return huboVentas
}
//console.log(huboVentas(2, 2019))

//Parte 2
//1)Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
//con la funcion PrecioMaquina

const ventasSucursal = (sucursal) => {
let acc = 0
let {ventas} = local
ventas.filter(venta => {
    if(venta.sucursal === sucursal){
        return  acc += precioMaquina(venta.componentes)
    }
})
return acc 
}
//console.log(ventasSucursal("Caballito"))

//2)Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

/**const ventasVendedora = (nombre) => {
    let acc = 0
    local.ventas.map(venta => {
        //console.log(venta)
        if (venta.nombreVendedora === nombre) {
            //console.log(venta.componentes)
            return acc += precioMaquina(venta.componentes)
        }
    })
    return acc
} 
const ventasSucursal = (sucursal) => {
let acc = 0
let {ventas} = local
ventas.filter(venta => {
    if(venta.sucursal === sucursal){
        return  acc += precioMaquina(venta.componentes)
    }
})
return acc 
}*/


//3)Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
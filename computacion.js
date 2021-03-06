let botonNuevaVenta = document.querySelector("#btn-ventas");
let agregar = document.querySelector(".agregar-venta");
let overlay = document.querySelector("#overlay");
let botonCancelar = document.querySelector(".btn-cancelar");
let botonPencil = document.querySelector("#pencil");
let botonTrash = document.querySelector("#trash");
let editarVenta = document.querySelector("#editar-venta")


botonNuevaVenta.addEventListener("click", () => {
  agregar.classList.remove("oculto")
  overlay.classList.remove("oculto")
})
botonCancelar.addEventListener("click", () => {
  agregar.classList.add("oculto")
  overlay.classList.add("oculto")
})




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
        <td><button id="pencil"><i class="fas fa-pencil id-para-editar-${i}"></i></button> 
        <button id="trash" onclick='eliminarVenta(${i})'
        ><i class="fas fa-trash id-para-borrarlo-${i}"></i></button></td>`

    tablaVentas.appendChild(crearFilas)
  }
}

crearTablaDeVentas()





//Funciones
//1)precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

function precioMaquina(componentes) {
  let acc = 0
  for (const componente of componentes) {
    //console.log(componente)
    local.precios.filter(precio => {
      if (componente === precio.componente)
        return acc += precio.precio
      //console.log(acc)
    })
  }
  return acc
}
//console.log(precioMaquina(["Monitor GPRS 3000", "HDD Toyiva", "RAM Quinston", "Motherboard ASUS 1200"]))

//2)cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas
const cantidadVentasComponente = (componente) => {
  let acc = 0
  let {ventas} = local
  for (const venta of ventas){
    venta.componentes.filter(producto => {
      //console.log(producto)
      if (componente === producto) {
        //console.log(componente)
        return acc++
      }

    })
  }
  return acc
}

//console.log(cantidadVentasComponente("Motherboard MZI"))

//funcion auxiliar para vendedora del mes
const ventasPorMesyPorVendedora = (vendedora, mes, anio) => {
  acc = 0
  let { ventas } = local
  for (let { nombreVendedora, componentes, fecha } of ventas) {
    if (vendedora === nombreVendedora && fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio) {
      return acc += precioMaquina(componentes)
    }
  }
  return acc
}

ventasPorMesyPorVendedora("Grace", 1, 2019);

//3)vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).


const vendedoraDelMes = (mes, anio) => {
  let { vendedoras } = local

  let ventasPorMesPorVendedora = vendedoras.map(vendedora => {
    return {
      vendedora: vendedora,
      ventasPorMes: ventasPorMesyPorVendedora(vendedora, mes, anio)
    }
  })

  let acc = 0
  let vendedoraDelMes = ''
  for (let { vendedora, ventasPorMes } of ventasPorMesPorVendedora) {
    if (acc < ventasPorMes) {
      acc = ventasPorMes
      vendedoraDelMes = vendedora
    }
  }

  return vendedoraDelMes
}

vendedoraDelMes(2, 2019)


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

//console.log(ventasMes(1, 2019))

//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const renderPorMes = (anio) => {
  let fechas = [];
  let {ventas} = local;
  for (const venta of ventas) {
    let fecha = venta.fecha.getMonth()
    !fechas.includes(fecha) && fechas.push(fecha)
  }
 fechas.sort((a,b) => {
   return a - b
 })
 const ventasPorMes = fechas.map(elemento => {
   return {
     fecha: elemento,
     total: ventasMes(elemento+1, anio)
   }
 })
 return ventasPorMes
}
//console.log(renderPorMes(2019))



//5)ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
  let acc = 0
  let {ventas} = local
  for (const venta of ventas) {
    //console.log(venta)
    if (venta.nombreVendedora === nombre) {
      //console.log(venta.componentes)
      return acc += precioMaquina(venta.componentes)
    }
  }
  return acc
}
//console.log(ventasVendedora("Sheryl"))

//6)componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
  let { precios } = local
  let productos = precios.map(precio => {
    //console.log(precio.componente)
    return precio.componente
  })
  let ventasTotales = productos.map(producto => {
    return {
      producto: producto,
      ventasTotales: cantidadVentasComponente(producto)
    }
  })
  //console.log(ventasTotales)

  let productoMasVendido = ""
  let ventasTotalesPorProducto = 0

  ventasTotales.map(producto => {
    if (producto.ventasTotales > ventasTotalesPorProducto) {
      productoMasVendido = producto.producto
      ventasTotalesPorProducto = producto.ventasTotales
    }
  })
  return productoMasVendido

}

//console.log(componenteMasVendido())

//7)huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const huboVentas = (mes, anio) => {
  let { ventas } = local
  let huboVentas = ventas.some(venta => {
    //console.log(venta.fecha)
    if (mes === venta.fecha.getMonth() + 1 && anio === venta.fecha.getFullYear()) {
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
  let { ventas } = local
  ventas.filter(venta => {
    if (venta.sucursal === sucursal) {
      return acc += precioMaquina(venta.componentes)
    }
  })
  return acc
}
//console.log(ventasSucursal("Caballito"))


//3)Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
  let ventasPorFecha = local.ventas.filter(venta => {
    if (mes === (venta.fecha.getMonth() + 1) && anio === venta.fecha.getFullYear()) {
      return venta
    }
  })
  let Centro = 0
  let Caballito = 0
  ventasPorFecha.map(venta => {
    switch (true) {
      case venta.sucursal === "Centro":
        Centro += precioMaquina(venta.componentes)
        break
      case venta.sucursal === "Caballito":
        Caballito += precioMaquina(venta.componentes)
        break
    }
  })
  let mejorSucursal = ""
  if (Centro > Caballito) {
    mejorSucursal = "Centro"
  } else {
    mejorSucursal = "Caballito"
  }
  return mejorSucursal
}
//console.log(sucursalDelMes(2, 2019))


//2)renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
//con la funcion ventasPorSucursal
const renderPorSucursal = () => {
  let { sucursales } = local

  let sucursalesVentas = sucursales.map(sucursal => {
    //console.log(sucursal)
    return {
      nombreDeSucursal: sucursal,
      ventasTotalesPorSucursal: ventasSucursal(sucursal)
    }
  })

  let stringsHTML = sucursalesVentas.reduce((acc, sucursal) => {
    return acc += `
    <tr>
           <td class="nombre-sucursal">${sucursal.nombreDeSucursal}</td>
           <td class="nombre-sucursal">${sucursal.ventasTotalesPorSucursal}</td>
          </tr>
    
    `
  }, "")
  //console.log(stringsHTML)

  document.querySelector("#tabla-venta-por-sucursal").innerHTML = stringsHTML


}
renderPorSucursal()

//3)render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó Reporte Ventas por mes: Total de enero 2019: 1250 Total de febrero 2019: 4210 Ventas por sucursal: Total de Centro: 4195 Total de Caballito: 1265 Producto estrella: Monitor GPRS 3000 Vendedora que más ingresos generó: Grace

const render = () => {
  renderPorSucursal()
  mostrarProductoEstrella()
  mejorVendedora()
}

//funcion de vendedora que mas ingresos genero
const mejorVendedora = () => {
  let { vendedoras } = local

  let laQueMasVendio = vendedoras.map(vendedora => {
    return {
      nombreDeVendedora: vendedora,
      ventasDeVendedora: ventasVendedora(vendedora)
    }
  })

  //console.log(laQueMasVendio)

  let acc = 0
  let mejorDeMejor = ""
  laQueMasVendio.map(vendedora => {
    if (vendedora.ventasDeVendedora > acc) {
      mejorDeMejor = vendedora.nombreDeVendedora
      acc = vendedora.ventasDeVendedora
    }
  })
  //console.log(mejorDeMejor)


  document.querySelector("#span-mas-ingresos").innerHTML = mejorDeMejor

  return mejorDeMejor
}
mejorVendedora()

//funcion de producto estrella
const mostrarProductoEstrella = () => {
  document.querySelector("#producto-estrella").innerHTML = componenteMasVendido()
}
mostrarProductoEstrella()

//cargando datos al modal de nueva venta
//vendedoras
const agregarVendedorasALaNuevaVenta = () => {
  let { vendedoras } = local

  let vendedorasParaHTML = vendedoras.reduce((acc, vendedora) => {
    return acc += `
    <option value="${vendedora}">${vendedora}</option>
    `
  }, "")

  document.querySelector('#vendedora-agregar-venta').innerHTML = vendedorasParaHTML

}
agregarVendedorasALaNuevaVenta()

//componentes
const agregarComponentesALaNuevaVenta = () => {
  let { precios } = local
  let componentesParaHTML = precios.reduce((acc, precio) => {
    //console.log(precio.componente)
    return acc += `
    <option value="${precio.componente}">${precio.componente}</option>
    `
  }, "")
  document.querySelector("#componentes-agregar-venta").innerHTML = componentesParaHTML

}
agregarComponentesALaNuevaVenta()

//sucursales
const agregarSucursalesALaNuevaVenta = () => {
  let { sucursales } = local
  let sucursalesParaHTML = sucursales.reduce((acc, sucursal) => {
    //console.log(sucursal)
    return acc += `
        <option value="${sucursal}">${sucursal}</option>
        `
  }, "")
  document.querySelector("#sucursal-agregar-venta").innerHTML = sucursalesParaHTML

}
agregarSucursalesALaNuevaVenta()


//funcion para guargar la nueva venta    



document.querySelector("#guardar-venta").addEventListener("click", () => {
  agregar.classList.add("oculto")
  overlay.classList.add("oculto")

  var componentes_options = document.getElementById('componentes-agregar-venta').selectedOptions;
  var componentes_values = Array.from(componentes_options).map(({ value }) => value);

  let nuevaVenta = {
    fecha: new Date(document.querySelector("#fecha-agregar-venta").value),
    nombreVendedora: document.querySelector("#vendedora-agregar-venta").value,
    componentes: componentes_values,
    sucursal: document.querySelector("#sucursal-agregar-venta").value
  }

  local.ventas.push(nuevaVenta)
  //console.table(local.ventas)
  document.querySelector("#formulario-de-nueva-venta").reset()
  tablaVentas.innerHTML = ''
  crearTablaDeVentas()
  render()
})

//funcion para eliminar ventas

const eliminarVenta = (index) => {
  document.querySelector("#modal-eliminar").classList.remove("oculto")
  overlay.classList.remove("oculto")
  indexParaBorrar = index
}

document.querySelector("#btn-eliminar").addEventListener('click', (e) => {
  e.preventDefault()
  document.querySelector("#modal-eliminar").classList.add("oculto")
  overlay.classList.add("oculto")

  local.ventas.splice(indexParaBorrar, 1)
  console.log(local.ventas)
  tablaVentas.innerHTML = ''
  crearTablaDeVentas()
  render()
})

document.querySelector(".btn-cancelar-modal").addEventListener('click', () => {
  document.querySelector("#modal-eliminar").classList.add("oculto")
  overlay.classList.add("oculto")
})

//funcion para editar ventas

const cargarinputsDatosEditar = () => {
  let { vendedoras } = local

  let vendedorasParaHTML = vendedoras.reduce((acc, vendedora) => {
    return acc += `
    <option value="${vendedora}">${vendedora}</option>
    `
  }, "")

  document.querySelector('#vendedora-editar-venta').innerHTML = vendedorasParaHTML

  let { precios } = local
  let componentesParaHTML = precios.reduce((acc, precio) => {
    //console.log(precio.componente)
    return acc += `
    <option value="${precio.componente}">${precio.componente}</option>
    `
  }, "")
  document.querySelector("#componentes-editar-venta").innerHTML = componentesParaHTML

  let { sucursales } = local
  let sucursalesParaHTML = sucursales.reduce((acc, sucursal) => {
    //console.log(sucursal)
    return acc += `
        <option value="${sucursal}">${sucursal}</option>
        `
  }, "")
  document.querySelector("#sucursal-editar-venta").innerHTML = sucursalesParaHTML
}

tablaVentas.addEventListener("click", (e) => {
  e.preventDefault()

  let item = e.target

  if (item.classList[1] === 'fa-pencil') {
    document.querySelector("#editar-venta").classList.remove("oculto")
    overlay.classList.remove("oculto")

    let itemIndex = parseInt(item.classList[2].slice(15))

    cargarinputsDatosEditar()

    llenarInputsEditar(itemIndex)

    indexParaEditar = itemIndex
  }

})

document.querySelector("#submit-editar").addEventListener('click', () => {

  var componentes_options = document.getElementById('componentes-editar-venta').selectedOptions;
  var componentes_values = Array.from(componentes_options).map(({ value }) => value);

  local.ventas[indexParaEditar].fecha = aniadirHoras(3, new Date(document.querySelector("#fecha-editar-venta").value)),
    local.ventas[indexParaEditar].nombreVendedora = document.querySelector("#vendedora-editar-venta").value,
    local.ventas[indexParaEditar].componentes = componentes_values,
    local.ventas[indexParaEditar].sucursal = document.querySelector("#sucursal-editar-venta").value

  console.log()

  tablaVentas.innerHTML = ''
  crearTablaDeVentas()
  render()
  document.querySelector(".editar-venta").classList.add("oculto")
  overlay.classList.add("oculto")
})

const llenarInputsEditar = (index) => {
  let { ventas } = local

  document.querySelector("#vendedora-editar-venta").value = ventas[index].nombreVendedora
  document.querySelector("#componentes-editar-venta").value = ventas[index].componentes
  document.querySelector("#fecha-editar-venta").value = `${ventas[index].fecha.getFullYear()}-${('0' + (ventas[index].fecha.getMonth() + 1)).slice(-2)}-${('0' + ventas[index].fecha.getDate()).slice(-2)}`

  document.querySelector("#sucursal-editar-venta").value = ventas[index].sucursal

}
llenarInputsEditar(3)

document.querySelector(".btn-cancelar-editar").addEventListener('click', () => {
  document.querySelector(".editar-venta").classList.add("oculto")
  overlay.classList.add("oculto")
})

function aniadirHoras(horas, date = new Date()) {
  const copiaFecha = new Date(date.getTime());

  copiaFecha.setTime(copiaFecha.getTime() + horas * 60 * 60 * 1000);

  return copiaFecha;
}



import React from "react"
import { buscarEnTablero } from "./tableroinicial"

import { tableroInicial } from "./tableroinicial"

class Jugador{

    constructor(nombre,posicion,puntos){

        this.nombre=nombre
        this.posicion={
            x:posicion[0],
            y:posicion[1]
        }
        this.puntos=puntos
        this.imagen=require(`../img/${nombre}.png`)
        this.movimientosDisponibles=[]
        this.turno=false
    }

}



export default Jugador
import React, {  useRef } from "react";
import { Button,} from "@material-ui/core";
import { useState } from "react";
import { tableroInicial, buscarEnTablero, getRandomInt } from "./tableroinicial";
import { jugador, pc } from "./tableroinicial";
import Item from "./item";
import Casilla from "./casilla";
import { estilos } from "./estilos";
import Jugador from "./jugador";
import { Howl } from "howler";









export const Tablero = (casilla) => {

    const [casillas, setCasillas] = useState(tableroInicial)
    let eligiendo = false
    
    const classes = estilos()
    const jugadorPc = useRef(0)

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }


    const forceUpdate = React.useState()[1].bind(null, {}) // see NOTE above const forceUpdate = React.useReducer(() => ({}))[1]











    const posiblesMovimientos = (e) => {

        

        

        if (jugador.turno){

            const x = parseInt(e.currentTarget.getAttribute('pos_x'))
        const y = parseInt(e.currentTarget.getAttribute('pos_y'))
        const nombreJugador = (e.currentTarget.getAttribute('nombre'))


        console.log(nombreJugador)

        let movimientos = [
            [x - 1, y - 2],
            [x - 1, y + 2],
            [x + 1, y - 2],
            [x + 1, y + 2],
            [x - 2, y - 1],
            [x - 2, y + 1],
            [x + 2, y - 1],
            [x + 2, y + 1]
        ]

        let movimientosValidos = []


        movimientos.forEach(element => {
            if (element[0] >= 0 &&
                element[0] <= 7 &&
                element[1] >= 0 &&
                element[1] <= 7 &&
                !(tableroInicial[buscarEnTablero(
                    element[0],
                    element[1]
                )] instanceof Jugador)) {
                movimientosValidos.push(element)
            }
        });


        jugador.movimientosDisponibles = movimientosValidos
 



        marcarMovimientos()
        

        }
        
    }




   const  posiblesMovimientosPc = () =>{


    const x=parseInt(jugadorPc.current.getAttribute('pos_x'))
    const y=parseInt(jugadorPc.current.getAttribute('pos_y'))


    

    console.log(y)
    console.log(x)

    let movimientos = [
        [x - 1, y - 2],
        [x - 1, y + 2],
        [x + 1, y - 2],
        [x + 1, y + 2],
        [x - 2, y - 1],
        [x - 2, y + 1],
        [x + 2, y - 1],
        [x + 2, y + 1]
    ]

    let movimientosValidos = []


    movimientos.forEach(element => {
        if (element[0] >= 0 &&
            element[0] <= 7 &&
            element[1] >= 0 &&
            element[1] <= 7 &&
            
            !(tableroInicial[buscarEnTablero(
                element[0],
                element[1]
            )] instanceof Jugador))
            
            {
            movimientosValidos.push(element)
        }
    });


    pc.movimientosDisponibles = movimientosValidos



   }


    const jugarPc=()=>{


        if (pc.turno){

        posiblesMovimientosPc()

        marcarMovimientos()
    
        inteligencia()
        
            limpiaMarcas()
  
            // forceUpdate() 
        }

    }

    const inteligencia=()=>{

        const movimientos=pc.movimientosDisponibles
        let movimientosQueDanPuntos=[]
        let movimientosDeEstrategia=[]
        let movimientoElegido=[]

        movimientos.forEach(movimiento => {


            if (tableroInicial[buscarEnTablero(
                movimiento[0],
                movimiento[1])] instanceof Item){
                    movimientosQueDanPuntos.push(movimiento)

                }
        });


        if (movimientosQueDanPuntos.length==0){
            moverPc(pc.movimientosDisponibles[getRandomInt(pc.movimientosDisponibles.length)])
        }else{
            moverPc(movimientosQueDanPuntos[0])
        }
    }




    const moverPc=(pos)=>{

        const x=pos[0]
        const y=pos[1]
        let puntosGanados=0

        const destino=tableroInicial[buscarEnTablero(x,y)]

        if (destino.tipo == 'manzana' || destino.tipo == 'pasto' || destino.tipo == 'flor') {
            puntosGanados = destino.valor
        }

        let PC_player =  pc

        const pos_x=pc.posicion.x
        const pos_y=pc.posicion.y


        console.log('hola')
        console.log(pos_x,pos_y)

       
        tableroInicial[buscarEnTablero(pos_x,pos_y)]=new Casilla([pos_x,pos_y],'inactivo')

        tableroInicial[buscarEnTablero(x,y)]=PC_player
        pc.posicion.x=x
        pc.posicion.y=y

        pc.puntos+=puntosGanados
        pc.movimientosDisponibles=[]
        

        forceUpdate()

        pc.turno=false
        jugador.turno=true



    }

    

    const marcarMovimientos = () => {

        let tableroActual = tableroInicial

        if (jugador.turno) {

            for (let i = 0; i < jugador.movimientosDisponibles.length; i++) {
                if (tableroActual[buscarEnTablero(jugador.movimientosDisponibles[i][0], jugador.movimientosDisponibles[i][1])] instanceof Item) {
                    tableroActual[buscarEnTablero(jugador.movimientosDisponibles[i][0], jugador.movimientosDisponibles[i][1])].estado = 'itemSeleccionado'

                } if (tableroActual[buscarEnTablero(jugador.movimientosDisponibles[i][0], jugador.movimientosDisponibles[i][1])].estado == 'inactivo') {
                    tableroActual[buscarEnTablero(jugador.movimientosDisponibles[i][0], jugador.movimientosDisponibles[i][1])].estado = 'candidato'

                }

            }
            setCasillas(tableroActual)

            forceUpdate()
 
        } else {

            for (let i = 0; i < pc.movimientosDisponibles.length; i++) {
                if (tableroActual[buscarEnTablero(pc.movimientosDisponibles[i][0], pc.movimientosDisponibles[i][1])] instanceof Item) {
                    tableroActual[buscarEnTablero(pc.movimientosDisponibles[i][0], pc.movimientosDisponibles[i][1])].estado = 'itemSeleccionado'

                } if (tableroActual[buscarEnTablero(pc.movimientosDisponibles[i][0], pc.movimientosDisponibles[i][1])].estado == 'inactivo') {
                    tableroActual[buscarEnTablero(pc.movimientosDisponibles[i][0], pc.movimientosDisponibles[i][1])].estado = 'candidato'

                }


            }

            setCasillas(tableroActual)
            forceUpdate()
        }



    }



    const limpiaMarcas = () => {

        tableroInicial.forEach(element => {
            if (element.estado == 'candidato') {
                element.estado = 'inactivo'
            } if (element.estado == 'itemSeleccionado') {
                element.estado = 'inicial'
            }
        });

        jugador.movimientosDisponibles = []

    }



    const moverJugador = (event) => {


        if (jugador.turno) {

            const x = parseInt(event.currentTarget.getAttribute('pos_x'))
            const y = parseInt(event.currentTarget.getAttribute('pos_y'))
            const tipo = event.currentTarget.getAttribute('tipo')
            let puntosGanados = 0
    
    
            if (tipo == 'manzana' || tipo == 'pasto' || tipo == 'flor') {
                puntosGanados = parseInt(event.currentTarget.getAttribute('valor'))
            }
    

            

            tableroInicial[buscarEnTablero(jugador.posicion.x, jugador.posicion.y)] =

            new Casilla([
                jugador.posicion.x,
                jugador.posicion.y],
                'inactivo')


            tableroInicial[buscarEnTablero(x, y)] = jugador

            jugador.posicion.x = x
            jugador.posicion.y = y
            jugador.movimientosDisponibles = []
            jugador.puntos = jugador.puntos + puntosGanados
            
            console.log(jugador.puntos)
            forceUpdate()


            limpiaMarcas()
            pc.turno=true
            jugador.turno=false
            jugarPc()
            
            }
    }





    return (



        <>
            <div className={classes.info}>

                <div className={classes.infoJugador}>
                    <img src={jugador.imagen} alt="" className={classes.imgInfoJugador} />


                    {jugador.turno ?

                        <div>
                            <img src={require('../img/moneda.gif')} className={classes.turnoJugador} />

                        </div> :

                        <div></div>}

                    <div className={classes.contador}>

                        <div>
                            {jugador.nombre}
                        </div>

                        <div>
                            {jugador.puntos}
                        </div>


                    </div>

                </div>

                <div className={classes.infoJugador}>

                    <img src={pc.imagen} alt="" className={classes.imgInfoJugador} />



                    { pc.turno ?

                        <div>
                            <img src={require('../img/moneda.gif')} className={classes.turnoPc} />

                        </div> :

                        <div></div>}
                    <div className={classes.contador}>
                        <div>
                            {pc.nombre}
                        </div>

                        <div>
                            {pc.puntos}
                        </div>
                    </div>

                </div>

            </div>

            <div container spacing={0} className={classes.tablero}>


                {casillas.map(elemento => {
                    return (

                        elemento.estado == 'inactivo' ?

                            <Button className={classes.casilla} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                pos_x={elemento.posicion.x}
                                pos_y={elemento.posicion.y}
                            >


                            </Button> :


                            elemento == pc ?

                                <Button className={classes.jugador} key={`${elemento.nombre} , ${elemento.posicion.y}`}
                                    pos_x={elemento.posicion.x}
                                    pos_y={elemento.posicion.y}
              
                                    nombre={elemento.nombre}
                                    ref={jugadorPc}>


                                    <img src={elemento.imagen} alt="" className={classes.jugador} />

                                </Button> :

                                elemento == jugador ?

                                    <Button className={classes.jugador} key={`${elemento.nombre} , ${elemento.posicion.y}`}
                                        pos_x={elemento.posicion.x}
                                        pos_y={elemento.posicion.y}
                                        onClick={posiblesMovimientos}
                                        nombre={elemento.nombre}
                                      >


                                        <img src={elemento.imagen} alt="" className={classes.jugador} />

                                    </Button> :


                                    elemento instanceof Item && elemento.estado != 'itemSeleccionado' ?

                                        <Button

                                            className={classes.item} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                            tipo={elemento.tipo}
                                            valor={elemento.valor}
                                            pos_x={elemento.posicion.x}
                                            pos_y={elemento.posicion.y}
                                        >
                                            <img src={elemento.imagen} alt="" className={classes.itemimagen} />

                                        </Button> :


                                        elemento instanceof Item && elemento.estado == 'itemSeleccionado' ?

                                            <Button

                                                className={classes.itemSeleccionado} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                                pos_x={elemento.posicion.x}
                                                pos_y={elemento.posicion.y}
                                                tipo={elemento.tipo}
                                                valor={elemento.valor}
                                                onClick={moverJugador}>

                                                <img src={elemento.imagen} alt="" className={classes.itemimagen} />


                                            </Button>



                                            :
                                            <Button

                                                className={classes.casillaCandidata} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                                pos_x={elemento.posicion.x}
                                                pos_y={elemento.posicion.y}
                                                onClick={moverJugador}>
                                                <img src={require("../img/movimiento3.gif")} alt="" className={classes.casillaCandidata} />

                                            </Button>


                    )
                })}



            </div>

        </>

    )
}
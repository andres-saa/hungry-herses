import React, { useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { tableroInicial, buscarEnTablero } from "./tableroinicial";
import { posiblesMovimientos } from "./tableroinicial";
import jugador from "./jugador";

const estilos = makeStyles((theme) => ({
    tablero: {
        width: 'max-content',
        height: 'max-content',
        margin: '200px auto',
        backgroundColor: 'gray',
        display: 'grid',
        gridTemplateColumns: 'repeat(8,1fr)',
        gridTemplateRows: 'repeat(8,1fr)',
        gap: '2px',
        border: '4px solid black'
    },
    ficha: {
        width: '80px',
        height: '80px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    ficha_c: {
        width: '80px',
        height: '80px',
        backgroundColor: '#A163EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    jugador: {

        width: '80px',
        height: '80px',

        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center'



    },

    pasto: {

        width: '80px',
        height: '80px',

        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center'



    }
}))


export const Tablero = (ficha) => {

    const [casillas, setCasillas] = useState(tableroInicial)
    let eligiendo = false
    let moves = []


    const forceUpdate = React.useState()[1].bind(null, {}) // see NOTE above const forceUpdate = React.useReducer(() => ({}))[1]


    const posiblesMovimientos = (e) => {

        const x = parseInt(e.currentTarget.getAttribute('pos_x'))
        const y = parseInt(e.currentTarget.getAttribute('pos_y'))

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


        if (eligiendo) { }
        movimientos.forEach(element => {
            if (element[0] >= 0 &&
                element[0] <= 7 &&
                element[1] >= 0 &&
                element[1] <= 7) {
                movimientosValidos.push(element)
            }
        });


        moves = movimientosValidos
        console.log(moves)
        eligiendo = true
        marcarMovimientos()


    }




    const marcarMovimientos = () => {

        let tableroActual = tableroInicial

        if (eligiendo) {

            for (let i = 0; i < moves.length; i++) {
                if (tableroActual[buscarEnTablero(moves[i][0], moves[i][1])].estado == 'pasto') {
                    tableroActual[buscarEnTablero(moves[i][0], moves[i][1])].estado = 'pastoSeleccionado'

                } if (tableroActual[buscarEnTablero(moves[i][0], moves[i][1])].estado == 'inactivo'){
                    tableroActual[buscarEnTablero(moves[i][0], moves[i][1])].estado = 'candidato'

                }


            }
            setCasillas(tableroActual)
            console.log(tableroActual)
            forceUpdate()
        }



    }

    const limpiaMarcas = () => {
        tableroInicial.forEach(element => {
            if (element.estado == 'candidato') {
                element.estado = 'inactivo'
            }if(element.estado=='pastoSeleccionado'){
                element.estado='pasto'
            }
        });

        moves = []
    }


    const moverJugador = (event) => {



        const x = parseInt(event.currentTarget.getAttribute('pos_x'))
        const y = parseInt(event.currentTarget.getAttribute('pos_y'))


        tableroInicial[buscarEnTablero(jugador.posicion.x, jugador.posicion.y)] = {
            posicion: {
                x: jugador.posicion.x,
                y: jugador.posicion.y
            },
            tipo: 'vacio',
            estado: 'inactivo'
        }

        tableroInicial[buscarEnTablero(x, y)] = jugador
        jugador.posicion.x = x
        jugador.posicion.y = y

        moves = []
        limpiaMarcas()

        forceUpdate()












    }




    const classes = estilos()


    return (

        <div container spacing={0} className={classes.tablero}>
            {casillas.map(elemento => {
                return (

                    elemento.estado == 'inactivo' ? <Button className={classes.ficha} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                        pos_x={elemento.posicion.x}
                        pos_y={elemento.posicion.y}
                    >
                    </Button> : elemento == jugador ?

                        <Button className={classes.jugador} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                            pos_x={elemento.posicion.x}
                            pos_y={elemento.posicion.y}
                            onClick={posiblesMovimientos}>
                            <img src={require('../img/jugador.png')} alt="" className={classes.jugador} />

                        </Button> : elemento.estado == 'pasto' ?

                            <Button

                                className={classes.pasto} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                pos_x={elemento.posicion.x}
                                pos_y={elemento.posicion.y}
                               >
                                <img src={require("../img/manzana.gif")} alt="" className={classes.pasto} />

                            </Button> : elemento.estado == 'pastoSeleccionado' ?

                                <Button

                                    className={classes.pasto} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                    pos_x={elemento.posicion.x}
                                    pos_y={elemento.posicion.y}
                                    onClick={moverJugador}>
                                    <img src={require("../img/manzana.gif")} alt="" className={classes.ficha_c} />

                                </Button>



                                :
                                <Button

                                    className={classes.ficha_c} key={`${elemento.posicion.x} , ${elemento.posicion.y}`}
                                    pos_x={elemento.posicion.x}
                                    pos_y={elemento.posicion.y}
                                    onClick={moverJugador}>
                                    <img src={require("../img/movimiento.gif")} alt="" className={classes.ficha_c} />

                                </Button>


                )
            })}

        </div>
    )
}
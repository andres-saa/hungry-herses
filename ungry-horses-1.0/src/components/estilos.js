
import React, { useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { tableroInicial, buscarEnTablero } from "./tableroinicial";
import { posiblesMovimientos } from "./tableroinicial";
import { jugador, pc } from "./tableroinicial";
import Jugador from "./jugador";
import fondo from "../img/fondo.png"
import Image from "../img/movimiento3.gif"; // Import using relative path
import destello from "../img/destello.gif"
import auraCaballo from "../img/auraCaballo.gif"
import Item from "./item";
import Casilla from "./casilla";



 


const estilos = makeStyles((theme) => ({
    tablero: {
        width: 'max-content',
        height: 'max-content',
        margin: ' auto',
        backgroundColor: 'gray',
        display: 'grid',
        gridTemplateColumns: 'repeat(8,1fr)',
        gridTemplateRows: 'repeat(8,1fr)',
        gap: '2px',
        border: '4px solid black'
    },
    casilla: {
        width: '80px',
        height: '80px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',





        justifyContent: 'center',


    },
    casillaCandidata: {
        width: '80px',
        height: '80px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundImage: `url(${destello})`,
            backgroundSize: 'cover',
            backgroundColor: 'yellow'

        }


    }, casillaCandidata_image: {
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    jugador: {
        width: '80px',
        height: '80px',
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',
        backgroundImage: `url(${auraCaballo})`,
        backgroundSize: 'cover'

    },

    item: {
        width: '80px',
        height: '80px',

        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',

    },

    itemimagen: {

        width: '60px',
        height: '60px',

        display: 'flex',
        backgroundColor: 'none',
        justifyContent: 'center'

    },
    itemSeleccionado: {

        width: '80px',
        height: '80px',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',

        '&:hover': {

            backgroundColor: 'yellow'

        },



    },

    info: {
        width: '655px',
        height: 'auto',
        margin: 'auto',
        border: '4px solid #000',
        fontFamily: 'roboto',
        fontWeight:'bold',
        color:'blsck',
        backgroundImage: `url(${fondo})`,
        backgroundSize:'cover',
        backgroundPositionY:'-100px'
    },

    infoJugador: {

        alignItems: 'center',
        display: 'flex',
        fontSize: '45px'
    },

    imgInfoJugador: {

        width: '80px',
        height: '80px',
        display: 'flex',
        
        justifyContent: 'center',
        // backgroundImage: `url(${auraCaballo})`,
        backgroundSize: 'cover',
        background:'linear-gradient(to left, transparent, red)',
        paddingRight:'60px'

        
    },
    contador: {
        display: 'flex',
        width: '80%',
        
        height: '80px',
        justifyContent: 'space-between',
        alignItems:'center',

        marginLeft: '120px',
        paddingRight: '60px',
        position: 'relative',
        color:'yellow',
        textTransform:'uppercase '
    },

    turnoJugador: {
        width: '80px',
        position: 'absolute',
        top: '10px',

    },

    turnoPc: {
        width: '80px',
        position: 'absolute',
        top: '90px',
        

    },
}))


export { estilos }
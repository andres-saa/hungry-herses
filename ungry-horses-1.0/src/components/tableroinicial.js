


import jugador from "./jugador"
let tableroInicial =[]

const llenarTablero = ()=>{

    const fichas = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            fichas.push({
                posicion:{
                    x:i,
                    y:j
                },
                tipo:'vacio',
                estado:'inactivo'
            })

        }
    }

    tableroInicial=fichas
}

const buscarEnTablero=(posx,posy)=>{
    let posicion=0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; i++) {
            if (tableroInicial[posicion].posicion.x === posx && tableroInicial[posicion].posicion.y===posy){
                return posicion
            }else{
                posicion++
            }

        }
        
        
    }
    
}


llenarTablero()
tableroInicial[buscarEnTablero(jugador.posicion.x,jugador.posicion.y)]=jugador

tableroInicial[buscarEnTablero(4,3)]={
    posicion:{
        x:4,
        y:3
    },
    tipo:'vacio',
    estado:'pasto'
}


tableroInicial[buscarEnTablero(3,5)]={
    posicion:{
        x:3,
        y:5
    },
    tipo:'vacio',
    estado:'pasto'
}




export {tableroInicial,buscarEnTablero,jugador}
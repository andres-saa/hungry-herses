


import Jugador from "./jugador"
import Casilla  from "./casilla"
import Item from "./item"
import { sound_caminar } from "./sonido"



let tableroInicial =[]
const jugador= new Jugador('jugador',[0,0],0)
const pc= new Jugador('pc',[0,0],0)


const puntosPorJugar={
    manzanas:2*5,
    pasto:14,
    flores:5*3,
    total:manzanas+pasto+flores
}


jugador.turno=true

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  const buscarEnTablero=(posx,posy)=>{
    let posicion=0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; i++) {
            if (tableroInicial[posicion].posicion.x == posx && tableroInicial[posicion].posicion.y==posy){
                return posicion
            }else{
                posicion++
            }
        }
    }

}




const llenarTablero = ()=>{

    const fichas = []

    let cantidadManzanas = 2
    let cantidadPasto = 14
    let cantidadFlores=5
    let numeroJudadores=2

    

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            fichas.push(
                new Casilla([i,j],'inactivo')
            )

        }
    }

    tableroInicial=fichas


    // meter manzanas




    while (cantidadManzanas > 0){

       const i=getRandomInt(8)
       const j=getRandomInt(8)

        if (
            !(tableroInicial[buscarEnTablero(i,j)] instanceof Item) && 
            !(tableroInicial[buscarEnTablero(i,j)] instanceof Jugador) ) {
                tableroInicial[buscarEnTablero(i,j)]=new Item ([i,j],'manzana','inicial',5)
            cantidadManzanas--
        }
    }


    while (cantidadPasto > -1){
        const i=getRandomInt(8)
        const j=getRandomInt(8)
         if (
             !(tableroInicial[buscarEnTablero(i,j)] instanceof Item) && 
             !(tableroInicial[buscarEnTablero(i,j)] instanceof Jugador) ) {
                 tableroInicial[buscarEnTablero(i,j)]=new Item ([i,j],'pasto','inicial',1)
             cantidadPasto--
         }
     }

     while (cantidadFlores > 0){

        const i=getRandomInt(8)
        const j=getRandomInt(8)
 
         if (
             !(tableroInicial[buscarEnTablero(i,j)] instanceof Item) && 
             !(tableroInicial[buscarEnTablero(i,j)] instanceof Jugador) ) {
                 tableroInicial[buscarEnTablero(i,j)]=new Item ([i,j],'flor','inicial',3)
             cantidadFlores--
         }
 
     }



    while (numeroJudadores > 1){

        const i=getRandomInt(8)
        const j=getRandomInt(8)
 
         if (
             !(tableroInicial[buscarEnTablero(i,j)] instanceof Item)) {
                jugador.posicion={x:i,y:j}
                 tableroInicial[buscarEnTablero(i,j)]=jugador
             numeroJudadores--
         }
    }


    while (numeroJudadores>0){

        const i=getRandomInt(8)
        const j=getRandomInt(8)
 
         if (
             !(tableroInicial[buscarEnTablero(i,j)] instanceof Item)) {
                pc.posicion={x:i,y:j}
                 tableroInicial[buscarEnTablero(i,j)]=pc
             numeroJudadores--
         }
    }


}



llenarTablero()





// tableroInicial[buscarEnTablero(3,5)]={
//     posicion:{
//         x:3,
//         y:5
//     },
//     tipo:'vacio',
//     estado:'pasto'
// }




export {tableroInicial,buscarEnTablero,jugador,pc,puntosPorJugar}
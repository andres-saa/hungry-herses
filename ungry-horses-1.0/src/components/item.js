

class Item{
    constructor(posicion,tipo,estado,valor){
        this.posicion={
            x:posicion[0],
            y:posicion[1],
        }
        this.tipo=tipo
        this.estado=estado
        this.valor=valor
        this.imagen=require(`../img/${tipo}.gif`)
    }
}


export default Item
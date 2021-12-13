const fs = require('fs')

class Contenedor {
    constructor(productos){
        this.productos = productos
    }
    productoId(id){
        return this.productos.find( producto => producto.id == id)
    }
    getId(){
        const pos = this.productos.length;
        return this.productos[pos - 1].id + 1
    }
    updateProducto(title, price, thumbnail){
        const productoActualizar ={
            title : title,
            price: price,
            thumbnail : thumbnail,
            id : Number(id)
        }
        for (let i = 0; i < this.productos.length; i++) {
            if(id == this.productos[i].id){
                this.productos[i] = productoActualizar
            }
        }
        return productoActualizar
    }
    deleteProducto(id){
        for (let i = 0; i < this.productos.length; i++) {
            if(id == this.productos[i].id){
                this.productos.splice(i, 1);
            }
        }
    }
}

module.exports = Contenedor; 
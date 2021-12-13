// express 
const express = require('express');
const { Router } = express
const Contenedor = require("./contenedor.js");

const app = express()
const PORT = 8080
const router = Router();
const server = app.listen(process.env.PORT || PORT);

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const productos = [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]
const productosContenedor = new Contenedor(productos);

router.get('/productos', (request, response) => {
    response.json(productos);
})

router.get('/productos/:id', (request, response) => {
    const id = request.params.id
    let mensaje = ''
    const productoExiste = productosContenedor.productoId(id);
    if(productoExiste){
        mensaje = productoExiste 
        response.json(mensaje)
    }else{
        mensaje = { error: 'No existe ese producto' };
        response.status(400).json(mensaje);
    }
})



router.post('/productos', (request, response) => {
    const producto = request.body;
    const productoNuevo = {
        ...producto,
        id : productosContenedor.getId()
    }
    productos.push(productoNuevo);
    response.json(
        producto
    );
})

router.put('/productos/:id' , (request , response) => {
    const id = request.params.id
    let mensaje = ''
    const productoExiste = productosContenedor.productoId(id);
    if(productoExiste){
        if(request.body){
            const {title, price, thumbnail} = request.body;
            mensaje = productosContenedor.updateProducto(title, price, thumbnail)
        }else{
            mensaje = {'error' :'no hay que actualizar'}
            response.json(mensaje)
        }
    }else{
        mensaje = { error: 'No existe ese producto' };
        response.status(400).json(mensaje);
    }
})

router.delete('/productos/:id' , (request , response) => {
    const id = request.params.id
    let mensaje = ''
    const productoExiste = productosContenedor.productoId(id);
    if(productoExiste){
        productosContenedor.deleteProducto(id);
        mensaje = {"eliminado" : 'se elimino'}
        response.json(mensaje)
    }else{
        mensaje = { error: 'No existe ese producto' };
        response.status(400).json(mensaje);
    }
})


server.on('error', (error)=>{
    console.log('hubo un error'+ error )
})

app.use(express.static('public'));
app.use("/api", router)
// express 
const express = require('express');
const { Router } = express

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

const getId = () => {
    const pos = productos.length;
    return productos[pos - 1].id + 1
}

const productoId = (id) => {
    return productos.find( producto => producto.id == id)
}


router.get('/productos', (request, response) => {
    response.json(productos);
})



router.get('/productos/:id', (request, response) => {
    const id = request.params.id
    let mensaje = ''
    const productoExiste = productoId(id);
    if(productoExiste){
        mensaje = producto
    }else{
        throw new Error('No existe ese producto');
    }
    response.json(mensaje)
})



router.post('/productos', (request, response) => {
    const producto = request.body;
    const productoNuevo = {
        ...producto,
        id : getId()
    }
    productos.push(productoNuevo);
    response.json(
        producto
    );
})

router.put('/productos/:id' , (request , response) => {
    const id = request.params.id
    let mensaje = ''
    const productoExiste = productoId(id);
    if(productoExiste){
        if(request.body){
            const {title, price, thumbnail} = request.body;
            const productoActualizar ={
                title : title,
                price: price,
                thumbnail : thumbnail,
                id : Number(id)
            }
            for (let i = 0; i < productos.length; i++) {
                if(id == productos[i].id){
                    productos[i] = productoActualizar
                }
            }
            mensaje = productoActualizar
        }else{
            mensaje = {'error' :'no hay que actualizar'}
        }
    }else{
        throw new Error('No existe ese producto');
    }
    response.json(mensaje)
})

router.delete('/productos/:id' , (request , response) => {
    const id = request.params.id
    let mensaje = ''
    const productoExiste = productoId(id);
    if(productoExiste){
        for (let i = 0; i < productos.length; i++) {
            if(id == productos[i].id){
                productos.splice(i, 1);
            }
        }
        mensaje = {"eliminado" : 'se elimino'}
    }else{
        throw new Error('No existe ese producto');
    }
    response.json(mensaje)
})


server.on('error', (error)=>{
    console.log('hubo un error'+ error )
})

app.use(express.static('public'));
app.use("/api", router)
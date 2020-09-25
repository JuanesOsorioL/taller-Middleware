const express=require("express");
const PORT = 80;
const app = express();

/*
app.get("/",
function(pedido, respuesta) { 

    const id = pedido.query.id;
    respuesta.send("hola mundo"+ id);

    respuesta.send("hola mundo");
    console.log(pedido)
})
*/


app.get("/", 
function(pedido, respuesta, proximo) {
    if (1==3) {
        proximo()
    } else {
        respuesta.send("uno es distinto de segundo numero");
    }

},
function(pedido, respuesta) { 
    respuesta.send("hola mundo");
    console.log(pedido)
})

app.listen( PORT, function() { console.log ( "servidor escuchando el puerto " + PORT ) } );

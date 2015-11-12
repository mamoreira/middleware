/* LIBRETIAS */

var express= require('express');
var app=express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var b = require('bonescript');
var mysql=require('mysql');
var md5=require('md5');
var path =require("path");
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extented: true 
}));


app.post("/user",function(req,res){
    var user=req.body.test;
    console.log(path,__dirname)
    res.sendFile(path.join("/var/lib/cloud9/middleware/public/sensores.html"));
})
/*VARIABLES*/
var sensores;

/* CONEXION CON BASE DE DATOS */
var connection=mysql.createConnection(
    {
        host: "192.168.7.1",
        user:"mmoreira",
        password:"1234",
        database:"sensores",
        port:3306
    });
connection.connect(
    function(error){
        if(error){
            throw error;
        }else{
            console.log("Conectado correctamente a la base de datos");
        }
    });
  //obteneer sensores  
connection.query("SELECT s.*,t.descripcion tipodescripcion,t.codigo tipocodigo,p.codigo as codpuerto,p.mode,p.pin,p.nc,p.no FROM sensor s join puerto p on p.id=s.puerto_id join tiposensor t on t.id=s.tiposensor_id where s.estado='A'",
    function (error,result) {
        if(error){
            throw error;
        }else{
            sensores=result;
        }
    }
);   


//Definir ruta donde se encuentra nuestro index.html
app.use(express.static("../public"));

/*SOCKET ESCUCHANDO QUE CLIENTE SE CONECTE*/
     //   b.pinMode("P9_11",b.INPUT);
     //   b.pinMode("P9_12",b.INPUT);
io.on('connection', function (socket) {
    console.log("Cliente conectado con socket");
    socket.emit("sensores",sensores);
    setInterval(function enviar() {
        var arreglo=new Array();
        for (var k in sensores) {
            b.pinMode(sensores[k].codpuerto,b.INPUT);
            if(sensores[k].nc == 'S'){
                if(b.digitalRead(sensores[k].codpuerto) == 1){
                   arreglo.push({
                    id: sensores[k].id,
                    texto: 0,
                    });
                }else{
                    arreglo.push({
                    id: sensores[k].id,
                    texto: 1,
                    }) ;
                }
            }else{
                arreglo.push({
                id: sensores[k].id,
                texto: b.digitalRead(sensores[k].codpuerto),
                });
            }
        }
        socket.emit("valores",arreglo);
    }
    , 100);
});
server.listen(8081,function(){
    console.log("Servidor NodeJs 192.168.7.2:8081 corriendo");
});


var  port = 33334;
var dgram = require( "dgram" );
var client = dgram.createSocket( "udp4" );
var b = require('bonescript');
var mysql=require('mysql');

/*VARIABLES*/
var sensores;
console.log( "The packet came back" );

// client listens on a port as well in order to receive ping
client.bind( port);
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

// proper message sending
// NOTE: the host/port pair points at server
var message = new Buffer( "My KungFu is Good!" );
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
  //         message=new Buffer(" "+sensores[k].id+ "," + b.digitalRead(sensores[k].codpuerto));
//           client.send(message, 0, message.length, 33333, "192.168.7.1" );
        }
        for (var i = arreglo.length; i--; ) {
            b.pinMode(sensores[i].codpuerto,b.INPUT);
           // if(sensores[k].nc == 'N'){
                console.log(b.digitalRead(sensores[i].codpuerto)+"-"+arreglo[i].texto);
                if(b.digitalRead(sensores[i].codpuerto) != arreglo[i].texto){
                    message=new Buffer(" "+arreglo[i].id+ "," + b.digitalRead(sensores[i].codpuerto));
                    client.send(message, 0, message.length, 33333, "192.168.7.1" );
                }
                
           // }
        }
    }
    , 100);
    

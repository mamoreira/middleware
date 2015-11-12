var PORT = 33333;
var HOST = '192.168.7.1';

var socket=io.connect("http://192.168.7.2:8081");
socket.on("sensores",function(data){
        mostrarSensores(data);
        socket.on("valores",function(data1){
            actualizarSensor(data1);
        });
});

function mostrarSensores(data){
    var html="";
    for(var i in data){
        html=html+`
        <div  class="col-lg-2">
        <div id=${data[i].codpuerto} class="panel panel-primary" >
            <div class="panel-heading" title="Codigo: ${data[i].codpuerto} Tipo: ${data[i].tipodescripcion}">
                    <h2>Sensor ${data[i].id}
                        <div id=sensor${data[i].id}><div class="noparpadeo"></div></div>
                    </h2>
            </div>
        </div>
        </div>
       `;
    }
    document.getElementById("mensaje").innerHTML = html;
}

function actualizarSensor(data){
    for(var i in data){
        if(data[i].texto == 1){
            var html=`<div class="parpadeo"></div> `;
            document.getElementById("sensor"+data[i].id).innerHTML=html
        }
    }
}

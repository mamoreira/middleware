var PORT = 33333;
var HOST = '192.168.7.1';

var socket=io.connect("http://192.168.7.2:8081");
socket.on("sensores",function(data){
        mostrarSensores(data);
        socket.on("valores",function(data1){
            actualizarSensor(data1);
        });
});
socket.on("listSensores",function(data2) {
    obtenerListSensores(data2);
}
);

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

function obtenerListSensores(data){
    var html="";
    for(var i in data){
        html=html+`
        <tr class="odd gradeA">
            <td>Trident</td>
            <td>Internet Explorer 7</td>
            <td>Win XP SP2+</td>
            <td class="center">7</td>
            <td class="center">A</td>
        </tr>
       `;
    }
    document.getElementById("listSensores").innerHTML = html;
}

var socket=io.connect("http://192.168.7.2:8081");
socket.on("listSensores",function(data2) {
    obtenerListSensores(data2);
}
);


function obtenerListSensores(data){
    var html="";
    for(var i in data){
        html=html+`
        <tr class="odd gradeA">
            <td>${data[i].id}</td>
            <td>${data[i].descripcion}</td>
            <td>(${data[i].tipocodigo}) ${data[i].tipodescripcion}</td>
            <td class="center">${data[i].codigo}</td>
            <td class="center">${data[i].mode}</td>
        </tr>
       `;
    }
    document.getElementById("listSensores").innerHTML = html;
}
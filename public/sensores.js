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
            <td class="center">${data[i].codpuerto}</td>
            <td class="center">${data[i].nc}</td>
        </tr>
       `;
    }
    document.getElementById("listSensores").innerHTML = html;
}

$(document).ready(function() {
    var table = $('#example').DataTable();
 
    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );
} );
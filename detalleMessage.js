$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('id')){
        let id = searchParams.get('id')
        consultarById1(id);
    }
});

function consultarById1(id){
    $.ajax({
        url: "https://g6d3f4bc7968872-computer2.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/"+id,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta.items);
            if (respuesta.items.length==1){
                llenarDatos2(respuesta.items[0]);
            }else{
                $("#boton").hide();
                alert('No se encuentra el message con el id '+id);
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function llenarDatos2(item){
    $("#id").val(item.id);
    $("#messagetext").val(item.name);
    
}
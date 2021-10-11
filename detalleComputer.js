$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('id')){
        let id = searchParams.get('id')
        consultarById3(id);
    }
});

function consultarById3(id){
    $.ajax({
        url: "https://g6d3f4bc7968872-computer2.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/computer/computer/"+id,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta.items);
            if (respuesta.items.length==1){
                llenarDatos3(respuesta.items[0]);
            }else{
                $("#boton").hide();
                alert('No se encuentra el cliente con el id '+id);
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function llenarDatos3(item){
    $("#id").val(item.id);
    $("#brand").val(item.brand);
    $("#model").val(item.model);
    $("#category_id").val(item.category_id);
    $("#name").val(item.name);
}
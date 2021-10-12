$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('id')){
        let id = searchParams.get('id')
        consultMessageById(id);
    }
});

var host = "https://gdb72580c38ae21-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/";

function consultMessageById(id){
    $.ajax({
        url: host+"message/message/"+id,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta.items);
            if (respuesta.items.length==1){
                updateMessageForm(respuesta.items[0]);
            }else{
                alert('No se encuentra el mensaje con el id ' + id);
                window.location.href = "/"
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "/"
        }
    });
}

function updateMessageForm(item){
    $("#id").val(item.id);
    $("#messageText").val(item.messagetext);  
}

function updateMessage() {

    console.log("ejecutando funcion para actualizar");
    var id = +$("#id").val();
    var messagetext = $("#messageText").val();

    if (messagetext.length === 0) {
        alert("No se puede actualizar el mensaje, tiene campos vacios");
    }
    else {
        var message = new Object();
        message.id = id;
        message.messagetext = messagetext;

        $.ajax({
            url: host + "message/message",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(message),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el mensaje');
                    window.location.href = "/"
                },
                555:function(){
                    alert('Un error ocurrio, No se puede actualziar el mensaje')
                }
            }
        });
    }
}
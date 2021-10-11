function actualizarMessage(){
    console.log("ejecutando funcion para actualizar");

    let message = {
        id: +$("#id").val(),
        messagetext: $("#messagetext").val(),        
    };

    console.log(message);

    $.ajax({
        url: "https://g6d3f4bc7968872-computer2.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: 'PUT',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(message),
        statusCode:{
            201:function(){
                alert('Se ha actualizado el message');
            }
        },
    });
}
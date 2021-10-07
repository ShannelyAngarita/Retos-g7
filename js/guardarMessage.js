





function guardarMessage() {
    let message = {
        id: +$("#id_message").val(),
        messagetext: $("#messageText").val()
    };

    console.log("Mensaje guardado exitosamente.");

    $.ajax({
        url: "https://g71784f6731af69-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type: 'POST',
        dataType: 'json',
        headers: {
            "Content-type": "application/json"
        },
        data: JSON.stringify(message),
        statusCode: {
            201:function(){
                alert("Se ha registrado exitosamente el mensaje.")
            }
        },
    });
}
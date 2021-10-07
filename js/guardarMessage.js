





function guardarMessage() {
    let message = {
        id: +$("#id_message").val(),
        messagetext: $("#messageText").val()
    };

    console.log("Mensaje guardado exitosamente.");

    $.ajax({
        url: "/////LINK DEL GRUPO/////",
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
var host = "https://gdb72580c38ae21-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/";

function consultMessage() {

    $.ajax({
        url: host + "message/message",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta.items);
            showTableMessage(respuesta.items);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function showTableMessage(items) {
    if (items.length > 0) {
        var tabla = `<table border="1">
                    <tr>
                        <th>ID</th>
                        <th>MESSAGETEXT</th>
                        
                        <th>ACCIONES</th>
                    </tr>`;


        for (var i = 0; i < items.length; i++) {
            tabla += `<tr>
                    <td>${items[i].id}</td>
                    <td>${items[i].messagetext}</td>
                    <td>
                            <button onclick="deleteMessageById(${items[i].id})">Eliminar</button>

                            <a href="detalleMessage.html?id=${items[i].id}">
                                <button type="submit"> Editar </button>
                            </a>
                    </td> 
                    </tr>`;
        }
        tabla += `</table>`;
        $("#messagetable").html(tabla);
    }
    else {
        alert("No existen mensajes para mostrar");
        window.location.href = "/"
    }
}

function saveMessage() {
    var id = +$("#id_message").val();
    var messagetext = $("#messageText").val();

    if (id == 0 || messagetext.length === 0) {
        alert("No se puede guardar el mensaje, tiene campos vacios");
    }
    else {
        var message = new Object();
        message.id = id;
        message.messagetext = messagetext;
        var jsonmessage = JSON.stringify(message);
        console.log(message)
        $.ajax({
            url: host + "message/message",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonmessage,
            statusCode: {
                201: function () {
                    alert('Se ha guardado el mensaje con id: ' + id);
                    consultMessage();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar el mensaje con el id: ' + id)
                }
            }
        });

    }
}

function deleteMessageById(id) {
    console.log("ejecutando funcion para eliminar")
    console.log(id)

    var message = new Object();
    message.id = id;

    $.ajax({
        url: host+"message/message",
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(message),
        statusCode: {
            204: function () {
                alert('Se ha eliminado el mensaje cond id: ' + id);
                consultMessage()
            }
        },
    });
}
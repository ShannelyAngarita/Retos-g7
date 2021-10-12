$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('id')) {
        let id = searchParams.get('id')
        consultclientById(id);
    }
});

var host = "https://gdb72580c38ae21-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/";

function consultclientById(id) {
    $.ajax({
        url: host + "client/client/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta.items);
            if (respuesta.items.length == 1) {
                updateClientForm(respuesta.items[0]);
            } else {
                alert('No se encuentra el cliente con el id ' + id);
                window.location.href = "/"
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "/"
        }
    });
}

function updateClientForm(item) {
    $("#id").val(item.id);
    $("#name").val(item.name);
    $("#email").val(item.email);
    $("#age").val(item.age);
}

function updateClient() {
    console.log("ejecutando funcion para actualizar");
    var id = +$("#id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var age = +$("#age").val();
    if (name.length === 0 || email.length === 0 || age == 0) {
        alert("No se puede actualizar el cliente, tiene campos vacios");
    }
    else {
        var client = new Object();
        client.id=id;
        client.name=name;
        client.email=email;
        client.age=age;

        $.ajax({
            url: host + "client/client",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(client),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el cliente');
                    window.location.href = "/"
                },
                555:function(){
                    alert('Un error ocurrio, No se puede actualziar el cliente')
                }
            }
        });
    }
}
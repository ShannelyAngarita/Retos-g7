





function guardarCliente() {
    let cliente = {
        id: +$("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val()
    };

    console.log("Cliente guardado exitosamente.");

    $.ajax({
        url: "https://g71784f6731af69-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type: 'POST',
        dataType: 'json',
        headers: {
            "Content-type": "application/json"
        },
        data: JSON.stringify(cliente),
        statusCode:{
            201:function(){
                alert('Se ha registrado cliente exitosamente.');
            }
        },
    });
}
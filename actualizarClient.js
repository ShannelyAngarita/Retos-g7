function actualizarClient(){
    console.log("ejecutando funcion para actualizar");

    let client = {
        id: +$("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: +$("#age").val()
    };

    console.log(client);

    $.ajax({
        url: "https://g6d3f4bc7968872-computer2.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: 'PUT',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(client),
        statusCode:{
            201:function(){
                alert('Se ha actualizado el cliente');
            }
        },
    });
}
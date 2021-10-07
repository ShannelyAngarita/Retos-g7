





function guardarCliente() {
    let cliente = {
        id: +$("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val()
    };

    console.log("Cliente guardado exitosamente.");

    $.ajax({
        url: "/////LINK DEL GRUPO//////",
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
function actualizarComputer(){
    console.log("ejecutando funcion para actualizar");

    let computer = {
        id: +$("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),
        
    };

    console.log(computer);

    $.ajax({
        url: "https://g6d3f4bc7968872-computer2.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/computer/computer",
        type: 'PUT',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(computer),
        statusCode:{
            201:function(){
                alert('Se ha actualizado el computador');
            }
        },
    });
}
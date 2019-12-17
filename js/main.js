// vamos gerar a tabela...

var list = [
    { "col_1": "val_11", "col_3": "val_13" },
    { "col_2": "val_22", "col_3": "val_23" },
    { "col_1": "val_31", "col_3": "val_33" }
];

function constructTable(selector) {

    console.log("constructTable(): initializing...");
    // Getting the all column names 
    var cols = Headers(list, selector);

    // Traversing the JSON data 
    for (var i = 0; i < list.length; i++) {
        var row = $('<tr/>');
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            var val = list[i][cols[colIndex]];

            // If there is any key, which is matching 
            // with the column name 
            if (val == null) val = "";
            row.append($('<td/>').html(val));
        }

        // Adding each row to the table 
        $(selector).append(row);
    }
}

function Headers(list, selector) {
    var columns = [];
    var header = $('<tr/>');

    for (var i = 0; i < list.length; i++) {
        var row = list[i];

        for (var k in row) {
            if ($.inArray(k, columns) == -1) {
                columns.push(k);

                // Creating the header 
                header.append($('<th/>').html(k));
            }
        }
    }

    // Appending the header to the table 
    $(selector).append(header);
    return columns;
}

$(document).ready(function () {
    console.log("Preparado!");
    // qual a data de hoje?
    var date = new Date();

    dia = date.getDate(); // de 1 a 31
    mes = date.getMonth() + 1; // porra de 0 a 11 !?
    ano = date.getFullYear(); // 4 dígitos

    console.log(date);

    hoje = ""; hoje = hoje.concat(ano).concat(mes).concat(dia);
    dataEspecificada = hoje;  // por enquanto...

    var capturedData;

    $.getJSON("dados/capturas/" + dataEspecificada + ".json", function (json) {
        console.log(json);
    });

    // Agora vamos criar uma lista a partir do que já temos?
    // https://www.w3schools.com/howto/howto_js_filter_lists.asp

    // vamos gerar a tabela?
    constructTable('#table');

});
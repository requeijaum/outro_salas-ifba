// vamos gerar a tabela...

/*
var list = [
    { "col_1": "val_11", "col_3": "val_13" },
    { "col_2": "val_22", "col_3": "val_23" },
    { "col_1": "val_31", "col_3": "val_33" }
];
*/

function insereMsgAlerta(alert, msg){
    let txt = alert.replace('</div>', msg + '</div>');
    return txt ; 
}

function constructTable(selector, list) {

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

function constructList(nomeAula, nomeSala, nomeArea, dados){
    
    // construir a porra toda pq sim... sem filtrar

    if ((nomeAula == "") && (nomeSala == "") && (nomeArea == "")) {

        num_salas = Object.keys(dados.dados).length - 1 ;
        console.log('constructList(): mostrando todas as ' + num_salas + ' salas!'); 
        //  ^^^ removi a chave "id"

        for (sala in dados.dados) { // in ou of ?
            // precisa ser numérico !!!
            if (isFinite(sala)) {
                obj = dados.dados[sala]
                // console.log("constructList(): iterando sala #" + sala + "...")
                // console.log(obj);
                
                htmlToAppend = '<li id="sala' + sala + 
                '" class="list-group-item"> <div class="row"><div class="sala_info col-*-6"> ' 
                + obj["nomeSala"] + '<br> <small>' + obj["nomeArea"] + '</small>\
                </div>\
                <div class="sala_info_extra col-*-6">\
                <ul class="lista_aulas"></ul>\
                </div></div>\
                </li>';
                
                $("#the_list").append(htmlToAppend);
                
                // esconder sala caso não tenha horarios?
                if (Object.keys(obj.horarios).length == 0){
                    console.log("A sala atual não tem horários...");
                    $("#sala"+sala).css("display","none");
                
                }

                // $("#sala"+sala+" .lista_aulas").append("<li>Teste 123</li>");
                for (horario in obj.horarios) {
                    $("#sala"+sala+" .lista_aulas").append("<li><b>" + horario + "</b> - " 
                    + obj.horarios[horario] + "</li>");

                }

            }
        }
    } 

}

function dispararBusca(){
    console.log("busca disparada!");
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

    var alertErro                   = '<div id="error" class="alert alert-danger" role="alert">' + '</div>';  // usar innerHTML pra setar algo no div :^)
    var msgErro_Requisicao          = "Falha ao obter dados de horários!!!";

    var capturedData = null;

    $.getJSON("dados/capturas/" + dataEspecificada + ".json", function (json) {
        //console.log(json);
        capturedData = json;
    })
    .fail(function(){
        console.log(msgErro_Requisicao) ; $('main').append(insereMsgAlerta(alertErro, msgErro_Requisicao)) 
    })
    .done(function(){
        console.log(capturedData); // constructTable('#table', capturedData) ;
        constructList("", "", "", capturedData)  // constructList(nomeAula, nomeSala, nomeArea, dados) --> 'nomeProfessor' incluso em nomeAula
    });
        


    // Agora vamos criar uma lista a partir do que já temos?
    // https://www.w3schools.com/howto/howto_js_filter_lists.asp


});


// funções auxiliares...

// prevenir que Enter ou qualquer outra coisa atualize a página
var preventSubmit = function(event) {
    if(event.keyCode == 13) {
        console.log("caught ya!");
        event.preventDefault();
        //event.stopPropagation();
        return false;
    }
}
$("#search_bar").keypress(preventSubmit);
$("#search_bar").keydown(preventSubmit);
$("#search_bar").keyup(preventSubmit);


// vamos verificar a dropdown list de opções?

var opcoes = {
    "nomeAula" : false,
    "nomeSala" : false,
    "nomeArea" : false,
};

function verificarDropdown(data){
    //console.log(data);
    console.log("verificarDropdown(): hmm...");

}

// vamos instanciar o Tempus Dominus para disparar sempre que clicar na parte da escolha de data
function setarDataBusca(data){
    console.log(data);
    //$('#calendario').datetimepicker();
    //data.focus();
    $('#calendario').show();
    $('#datetimepicker1 input').focus();
}

$(function(){
    $('#datetimepicker1').datetimepicker();

});
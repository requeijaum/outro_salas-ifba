// vamos gerar a tabela...

/*
var list = [
    { "col_1": "val_11", "col_3": "val_13" },
    { "col_2": "val_22", "col_3": "val_23" },
    { "col_1": "val_31", "col_3": "val_33" }
];
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


*/

function insereMsgAlerta(alert, msg){
    let txt = alert.replace('</div>', msg + '</div>');
    return txt ; 
}

function constructList(nomeAula, nomeSala, nomeArea, dados){
    
    // limpar tudo, né?
    $('#the_list').html("");

    // construir a porra toda pq sim... sem filtrar

    if ((nomeAula == "") && (nomeSala == "") && (nomeArea == "")) {

        // mostrar tudo !!!
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
                '" class="list-group-item"> <div class="row"><div class="sala_info col-*-6 push-left"> ' 
                + obj["nomeSala"] + '<br> <small>' + obj["nomeArea"] + '</small>\
                </div>\
                <div class="sala_info_extra col-*-6 push-right">\
                <ul class="lista_aulas"></ul>\
                </div></div>\
                </li>';
                
                $("#the_list").append(htmlToAppend);
                
                // esconder sala caso não tenha horarios?
                if (Object.keys(obj.horarios).length == 0){
                    console.log("A sala #" + sala + " - " + obj["nomeSala"] + " - não tem horários...");
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

    if ((nomeAula != "") && (nomeSala == "") && (nomeArea == "")) {

        // procurar pelo nome da aula
        num_salas = Object.keys(dados.dados).length - 1 ;
        console.log('constructList(): mostrando todas as ' + num_salas + ' salas!'); 
        //  ^^^ removi a chave "id"

        for (sala in dados.dados) { // in ou of ?
            // precisa ser numérico !!!
            if (isFinite(sala) && (nomeAula in dados.dados[sala].horarios)) {
                obj = dados.dados[sala]
                // console.log("constructList(): iterando sala #" + sala + "...")
                // console.log(obj);

                // preciso de alguma condicional pra mostrar somente as salas com dados.dados[sala].horarios == nomeAula
                for (horario in dados.dados[sala].horarios) {
                    console.log(horario);
                    if (horario == nomeSala) {
                        console.log("horario == nomeSala!!!");

                        htmlToAppend = '<li id="sala' + sala + 
                        '" class="list-group-item"> <div class="row"><div class="sala_info col-*-6 push-left"> ' 
                        + obj["nomeSala"] + '<br> <small>' + obj["nomeArea"] + '</small>\
                        </div>\
                        <div class="sala_info_extra col-*-6 push-right">\
                        <ul class="lista_aulas"></ul>\
                        </div></div>\
                        </li>';
                        
                        $("#the_list").append(htmlToAppend);
                        
                        // esconder sala caso não tenha horarios?
                        if (Object.keys(obj.horarios).length == 0){
                            console.log("A sala #" + sala + " - " + obj["nomeSala"] + " - não tem horários...");
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

// instanciar, né?

var capturedData = null;

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
    //dataEspecificada = "20191219"; // debug...

    var alertErro                   = '<div id="error" class="alert alert-danger" role="alert">' + '</div>';  // usar innerHTML pra setar algo no div :^)
    var msgErro_Requisicao          = "Falha ao obter dados de horários!!!";


    // terei que repetir isso a cada especificacao de data... 

    $.getJSON("dados/capturas/" + dataEspecificada + ".json", function (json) {
        //console.log(json);
        capturedData = json;
    })
    .fail(function(){
        console.log(msgErro_Requisicao) ; $('main').append(insereMsgAlerta(alertErro, msgErro_Requisicao)) 
    })
    .done(function(){
        console.log(capturedData);                          // constructTable('#table', capturedData) ;
        constructList("", "", "", capturedData)             // constructList(nomeAula, nomeSala, nomeArea, dados) --> 'nomeProfessor' incluso em nomeAula
        $('#dia_a_mostrar').html(dia+"/"+mes+"/"+ano);      // avisar na tela qual o dia que estamos vendo...
        
    });
        


    // Agora vamos criar uma lista a partir do que já temos?
    // https://www.w3schools.com/howto/howto_js_filter_lists.asp


});


// funções auxiliares...

// prevenir que Enter ou qualquer outra coisa atualize a página
/*
var preventSubmit = function(event) {
    if(event.keyCode == 13) {
        console.log("caught ya!");
        event.preventDefault();
        //event.stopPropagation();
        return false;
    }
}

$("#search_bar :input").keypress(preventSubmit);
$("#search_bar :input").keydown(preventSubmit);
$("#search_bar :input").keyup(preventSubmit);

$('#search_input :input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});

*/


// vamos verificar a dropdown list de opções?

var opcoes = {
    "nomeAula" : true,
    "nomeSala" : false,
    "nomeArea" : false,
};

function verificarDropdown(data, opcoes){
    //console.log(data);
    console.log(opcoes);

    console.log("verificarDropdown(): hmm...");
    
    if(opcoes.nomeAula){
        $('#nomeAula_drop').addClass('active');
    } else {$('#nomeAula_drop').removeClass('active');}
    
    if(opcoes.nomeSala){
        $('#nomeSala_drop').addClass('active');
    } else {$('#nomeSala_drop').removeClass('active');}
    
    if(opcoes.nomeArea){
        $('#nomeArea_drop').addClass('active');
    } else {$('#nomeArea_drop').removeClass('active');}

}


function escolheModoBusca(data, opcoes) {   // tá dando alguma merda com Promise indo e voltando como fullfiled...
    
    var opcoes = opcoes ;

    console.log("seguem as opcoes antes da operacao...");
    console.log(opcoes); // mostra o final da operacao - pq ta aparecendo uma promise?
            

    nomeOpcao = $(data).attr('name');
    console.log("opcao escolhida: " + nomeOpcao);
    
    async function resetarOpcoes(opcoes){   // reseta tudo pra falso
        novasOpcoes = opcoes;
        novasOpcoes.nomeAula = false; novasOpcoes.nomeSala = false; novasOpcoes.nomeArea = false; 
        return novasOpcoes; 
    }
    
    async function setarOpcao(nomeOpcao, opcoes){  
        
        if(nomeOpcao){ // lembre-se: JS roda tudo em paralelo...
            
            opcoesDefinitivas = await resetarOpcoes(opcoes); // depois de resetar...

            opcoesDefinitivas[nomeOpcao] = true; // joga a opcao correta pra true, de forma exclusiva
            console.log("seguem as opcoes depois da operacao...");
            console.log(opcoesDefinitivas); // mostra o final da operacao
            
            //return opcoesDefinitivas;
            
            if(typeof(opcoesDefinitivas) == typeof(Promise))  return opcoesDefinitivas.value ;
            if(typeof(opcoesDefinitivas) == typeof(Object))   return opcoesDefinitivas ;

        }
    
    }

    return setarOpcao(nomeOpcao, opcoes); // retorna opcoesDefinitivas via async ;^)


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

function buscar(data, allData){

    //console.log(data.value);
    // avaliar qual a opção setada...

    if( (opcoes.nomeAula) && !(opcoes.nomeSala) && !(opcoes.nomeArea) ) {
        console.log("buscar('" + data.value + "'): construindo lista por nomeAula");
        constructList(data.value, "", "", allData);  // function constructList(nomeAula, nomeSala, nomeArea, dados){ ...
    }

    if( !(opcoes.nomeAula) && (opcoes.nomeSala) && !(opcoes.nomeArea) ) {
        console.log("buscar(): construindo lista por nomeSala");
        constructList("", data.value, "", allData);  // function constructList(nomeAula, nomeSala, nomeArea, dados){ ...
    }

    if( !(opcoes.nomeAula) && !(opcoes.nomeSala) && (opcoes.nomeArea) ) {
        console.log("buscar(): construindo lista por nomeArea");
        constructList("", "", data.value, allData);  // function constructList(nomeAula, nomeSala, nomeArea, dados){ ...
    }



}
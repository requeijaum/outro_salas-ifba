$(document).ready(function(){
    console.log("Preparado!");
    // qual a data de hoje?
    var date = new Date();

    dia = date.getDate(); // de 1 a 31
    mes = date.getMonth()+1; // porra de 0 a 11 !?
    ano = date.getFullYear(); // 4 dígitos
    
    console.log(date);

    hoje = ""; hoje = hoje.concat(ano).concat(mes).concat(dia);
    dataEspecificada = hoje;  // por enquanto...

    var capturedData ;

    $.getJSON("dados/capturas/" + dataEspecificada + ".json" , function(json){
        console.log(json);
    });

    // Agora vamos criar uma lista a partir do que já temos?
    // https://www.w3schools.com/howto/howto_js_filter_lists.asp
});
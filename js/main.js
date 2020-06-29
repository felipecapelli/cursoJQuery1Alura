var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//$(document).ready(function(){ //funciona igual a linha baixo
$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha")
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
        /*
            //------------Esse mesmo código poderia ser feito comm ES6
            if( frase.startsWith(digitado)) {
                campo.addClass("borda-verde");
            } else {
                campo.addClass("borda-vermelha");
            }

        */
    });
}


function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () { //focus é pra quando clicar ou pra quando dar o tab no item, o one só vale para o primeiro focus
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroId = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    //campo.removeAttr("disabled");//funciona igual a linha baixo
    campo.attr("disabled", true);
    $("#botao-reiniciar").removeAttr("disabled");
    //campo.css("background-color", "lightgray"); //Para adicionar uma propriedade css a um elemento
    //var cor = campo.css("background-color"); //Se fizer assim da pra recuperar o valor da propriedade css
    //var valores = campo.css(["background-color","width"]); //Da tbm pra recuperar varios valores e acessar como um objeto: (exemplo) valores.width
    //campo.addClass("campo-desativado"); //adiciona uma classe a tag
    campo.toggleClass("campo-desativado"); //se não tiver a class, coloca, mas se tiver a classe, tira
    inserePlacar();
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    //campo.removeClass("campo-desativado"); //retira a classe da tag
    campo.toggleClass("campo-desativado"); //se não tiver a class, coloca, mas se tiver a classe, tira
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
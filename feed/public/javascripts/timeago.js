(function() {


    var escreveBaseadoNaQtd = function(qtd, resultadoUm, resultadoMuitos) {
        var resultado = '';
        if (qtd == 1) {
            resultado += qtd + ' ' + resultadoUm;
        } else if (qtd > 1) {
            resultado += qtd + ' ' + resultadoMuitos;
        }

        return resultado;
    };

    var timeago = function(inicio, fim) {
        inicioMs = inicio.getTime();
        var fimMS = fim.getTime();

        var diferencaMs = fimMS - inicioMs,
            diferencaS = Math.abs(diferencaMs) / 1000,
            diferencaMin = diferencaS / 60,
            diferancaH = diferencaMin / 60,
            diferencaD = diferancaH / 24,
            diferencaM = diferencaD / 30,
            diferencaA = diferencaM / 365;

        var minutosRestantes = diferencaMin;

        var qtdAnosInteiros = 0;
        var qtdMesesInteiros = 0;
        var qtdDiasInteiros = 0;
        var qtdHorasInteiros = 0;
        var qtdMinutosInteiros = 0;

        if (diferencaA >= 1) {
            qtdAnosInteiros = Math.floor(diferencaA);
            minutosRestantes -= qtdAnosInteiros * 365 * 30 * 24 * 60;
        }

        if (diferencaM >= 1) {
            diferencaM = minutosRestantes / 60 / 24 / 30;
            qtdMesesInteiros = Math.floor(diferencaM);
            minutosRestantes -= qtdAnosInteiros * 30 * 24 * 60;
        }

        if (diferencaD >= 1) {
            diferencaD = minutosRestantes / 60 / 24;
            qtdDiasInteiros = Math.floor(diferencaD);
            minutosRestantes -= qtdDiasInteiros * 24 * 60;
        }

        if (diferancaH >= 1) {
            diferancaH = minutosRestantes / 60;
            qtdHorasInteiros = Math.floor(diferancaH);
            minutosRestantes -= qtdHorasInteiros * 60;
        }

        if (diferencaMin >= 1) {
            qtdMinutosInteiros = Math.floor(minutosRestantes);
            minutosRestantes -= qtdMinutosInteiros;
        }

        var resultado = 'AGORA';
        if (qtdAnosInteiros > 0) {
            resultado = 'HÁ ' + escreveBaseadoNaQtd(qtdAnosInteiros, 'ANO', 'ANOS');
            if (qtdMesesInteiros > 0) {
                resultado += ' E ' + escreveBaseadoNaQtd(qtdMesesInteiros, 'MÊS', 'MESES');
            }
        } else if (qtdMesesInteiros > 0) {
            resultado = 'HÁ ' + escreveBaseadoNaQtd(qtdMesesInteiros, 'MÊS', 'MESES');
            if (qtdDiasInteiros > 0) {
                resultado += ' E ' + escreveBaseadoNaQtd(qtdDiasInteiros, 'DIA', 'DIAS');
            }
        } else if (qtdDiasInteiros > 0) {
            resultado = 'HÁ ' + escreveBaseadoNaQtd(qtdDiasInteiros, 'DIA', 'DIAS');
            if (qtdHorasInteiros > 0) {
                resultado += ' E ' + escreveBaseadoNaQtd(qtdHorasInteiros, 'HORA', 'HORAS');
            }
        } else if (qtdHorasInteiros > 0) {
            resultado = 'HÁ ' + escreveBaseadoNaQtd(qtdHorasInteiros, 'HORA', 'HORAS');
            if (qtdMinutosInteiros > 0) {
                resultado += ' E ' + escreveBaseadoNaQtd(qtdMinutosInteiros, 'MINUTO', 'MINUTOS');
            }
        } else if (qtdMinutosInteiros > 0) {
            resultado = 'HÁ ' + escreveBaseadoNaQtd(qtdMinutosInteiros, 'MINUTO', 'MINUTOS');
        }

        return resultado;
    };

    window.APP = window.APP || {};
    window.APP.modules = window.APP.modules || {};
    window.APP.modules.timeago = timeago;

})();

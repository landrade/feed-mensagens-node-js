$(document).ready(function() {

    var atualizarDatasDeEnvio = function() {
        $('.timeago').html(function() {
            var dataMensagem = $(this).attr('data-enviado-em'),
                dataMensagem = dataMensagem.substring(1, dataMensagem.length - 1),
                dataMensagem = new Date(dataMensagem);
            return window.APP.modules.timeago(dataMensagem, new Date());
        });
    };

    var enviarMsg = function() {
        var input = $('#new-message-text');
        var msg = input.val();
        if (msg !== '') {
            socket.emit('envia-nova-mensagem', {
                msg: msg
            });
        }
        input.val('');
    };

    var adicionarMensagensAntigas = function(mensagens) {
        $('#messages').append(mensagens);
        atualizarDatasDeEnvio();
    };

    var carregarMensagensAntigas = function(ultimoId) {

        $.ajax({
                url: '/mensagem/antigas',
                data: {
                    aPartir: ultimoId
                }
            })
            .done(function(data) {
                $('.more-message-button').remove();
                adicionarMensagensAntigas(data);
            })
            .fail(function() {
                $('.loader').hide();
                $('.more-message-button .text').show();
            });

    }

    var socket = io();

    socket.on('recebe-nova-mensagem', function(mensagem) {
        $('#messages').prepend(mensagem);
        atualizarDatasDeEnvio();
    });

    socket.on('recebe-mensagens-antigas', adicionarMensagensAntigas);

    $('#new-message-send-button').on('click', enviarMsg);
    $('#new-message-text').keypress(function(event) {
        var key = event.which;
        if (key == 13) { //ENTER
            enviarMsg();
            return false;
        }
    });

    $('#messages').on('click', '.more-message-button', function() {
        $('.more-message-button .text').hide();
        $('.loader').show();
        var ultimoId = $(this).attr('data-ultimo-id');
        carregarMensagensAntigas(ultimoId);
    });

    setInterval(atualizarDatasDeEnvio, 30000);

});

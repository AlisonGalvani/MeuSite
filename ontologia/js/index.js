// Treeview Initialization
$(document).ready(function() {
  $('.treeview-animated').mdbTreeview();
  $('#nivelMaisBaixo').click(function() {
    $('#nivelMaisBaixo').css('width', '300px');
    $('#divDescricao').show();
    $('#btnGerar').show();
  })
});

$('#btnGerar').on('click', function(e) {

});

function montaMensagem() {  
  let textoUsuario = $('#textUser').val();
  let text = "<h5>Foi encontrado um bug <b> no Resultado Final do Relátorio de Cadastro Econômico da Contabilidade que encontra-se na guia Documento do módulo Contábil. Favor Ajustar o Cálculo. </b> <br><br> Descrição usuário: " + textoUsuario + "</h5>";
  $('#divMensagem').empty();
  $('#divMensagem').prepend(text);
  $('#basicExampleModal').toggle();
}
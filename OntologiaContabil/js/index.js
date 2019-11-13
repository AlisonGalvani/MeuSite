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
  
  let text = '<h5>Bug no <b>Resultado Final</b> do <b>Relátorio de cadastro econômico</b> dos relátorios da' +
  ' <b>Contabilidade</b>, na guia <b>Documento</b> do módulo <b>Contábil</b><br> onde <b>' + textoUsuario +  '</b></h5>';
  
  $('#divMensagem').prepend(text);
  $('#basicExampleModal').toggle();
}
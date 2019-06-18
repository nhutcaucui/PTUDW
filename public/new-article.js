var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['image','video']       // toggled buttons
];

var quill = new Quill('#quill-body', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
  name: 'content'
});

$(function(){
  $('#input-b2').fileinput({
      allowedFileExtensions: ['png', 'jpg'],
      uploadUrl:'/new',
      uploadASync: false,
  })
})

$( document ).ready(function() {
  $('div.ql-editor').attr('id', 'ql-editor');
});



$('#new-article-form').submit(function() { 
  if ($('#ql-editor', '#new-article-form').html()=="<p><br></p>"){
      $( "<div class='error'>Xin vui lòng nhập nội dung</div>" ).insertAfter( "#quill-body" );
      return false;
  }
  else{
var markup = $('#ql-editor', '#new-article-form').html();
$('#content', '#new-article-form').val( markup );
  }
});
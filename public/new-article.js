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
  $('div.ql-editor').attr('name', 'ql-editor');
});

$('#new-article-form').submit(function() { 
var markup = $('#ql-editor', '#new-article-form').html();
console.log(markup);
$('#content', '#new-article-form').val( markup );
});
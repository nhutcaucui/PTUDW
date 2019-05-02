var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['image','video']       // toggled buttons
];

var quill = new Quill('#quill-body', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});
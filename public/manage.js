$('#add-cat').click(function(){             
    $("#cat-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#addcat');
           },
           errorElement: 'div',
        rules:{
            catadd: {
                required: true,
                // remote: {
                // url: '/admin/is-available-add-cat',
                // }
            }
        },
        messages:{
            catadd:{
                required: 'Vui lòng nhập tên chuyên mục',
                remote: 'Chuyên mục đã tồn tại',
            }
        }
    });             
}); 

$('#edt-cat').click(function(){             
    $("#cat-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#edtcat');
           },
           errorElement: 'div',
        rules:{
            catedt: {
                required: true,
                // remote: {
                // url: '/admin/is-available-edt-cat',
                // }
            },
            cat: {
                required:true,               
            },
        },
        messages:{
            catedt:{
                required: 'Vui lòng nhập tên chuyên mục',
                remote: 'Chuyên mục đã tồn tại',
            },
            cat: {
                required: 'Vui lòng chọn chuyên mục'
            },
        }
    });             
}); 

$('#del-cat').click(function(){             
    $("#cat-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#delcat');
           },
           errorElement: 'div',
        rules:{
            cat: {
                required:true
            },
        },
        messages:{
            cat: {
                required: 'Vui lòng chọn chuyên mục'
            },
        }
    });             
}); 

$('#add-subcat').click(function(){             
    $("#subcat-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#addsubcat');
           },
           errorElement: 'div',
        rules:{
            subcatadd:{
                required:true,
                // remote: {
                // url: '/admin/is-available-add-subcat',
                // }
            },
            sccat: {
                required:true,
            },
        },
        messages:{
            subcatadd:{
                required: 'Vui lòng nhập chuyên mục nhỏ cần thêm',
                remote: 'Chuyên mục đã tồn tại',
            },
            sccat: {
                required: 'Vui lòng chọn chuyên mục lớn'
            },
        }
    });             
}); 

$('#edt-subcat').click(function(){             
    $("#subcat-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#edtsubcat');
           },
           errorElement: 'div',
        rules:{
            subcatedt:{
                required:true,
                // remote: {
                // url: '/admin/is-available-edt-subcat',
                // }
            },
            sccat: {
                required:true,
            },
            scsubcat: {
                required:true,
            },
        },
        messages:{
            subcatedt:{
                required: 'Vui lòng nhập chuyên mục nhỏ cần sửa',
                remote: 'Chuyên mục đã tồn tại',
            },
            sccat: {
                required: 'Vui lòng chọn chuyên mục lớn',
            },
            scsubcat: {
                required: 'Vui lòng chọn chuyên mục nhỏ',
            },
        }
    });             
}); 

$('#del-subcat').click(function(){             
    $("#subcat-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#delsubcat');
           },
           errorElement: 'div',
        rules:{
            sccat: {
                required:true,
            },
            scsubcat: {
                required:true,
            },
        },
        messages:{
            sccat: {
                required: 'Vui lòng chọn chuyên mục lớn',
            },
            scsubcat: {
                required: 'Vui lòng chọn chuyên mục nhỏ',
            },
        }
    });             
}); 

$('#add-btn-ew').click(function(){             
    $("#ew-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#add-edt-wrt');
           },
           errorElement: 'div',
        rules:{
            username: {
                required:true,
                // remote: {
                // url:'/admin/is-available',
                // }
            },
            password: {
                required:true,
                
            },
        },
        messages:{
            username: {
                required:'Vui lòng nhập username',
                remote:'Username đã tồn tại',
            },
            password: {
                required:'Vui lòng nhập password',
            },
        }
    });             
}); 

$('#del-btn-ew').click(function(){             
    $("#ew-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#del-edt-wrt');
           },
           errorElement: 'div',
        rules:{
            listew: {
                required:true,
            },
        },
        messages:{
            listew: {
                required:'Vui lòng chọn user',
            },
        }
    });             
});

$('#ext-btn-reader').click(function(){             
    $("#reader-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#extend-reader');
           },
           errorElement: 'div',
        rules:{
            listreader: {
                required:true,
            },
        },
        messages:{
            listreader: {
                required:'Vui lòng chọn user',
            },
        }
    });             
}); 

$('#ext-btn-reader').click(function(){             
    $("#reader-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#extend-reader');
           },
           errorElement: 'div',
        rules:{
            listreader: {
                required:true,
            },
        },
        messages:{
            listreader: {
                required:'Vui lòng chọn user',
            },
        }
    });             
});

$('#asign-btn').click(function(){             
    $("#asign-form").validate({
        errorPlacement: function(error, element) {
             error.appendTo('#asign-edt');
           },
           errorElement: 'div',
        rules:{
            edtlist: {
                required:true,
            },
            edtcatlist: {
                required:true,
            },
        },
        messages:{
            edtlist: {
                required:'Vui lòng chọn user',
            },
            edtcatlist: {
                required:'Vui lòng chọn chuyên mục',
            },
        }
    });             
}); 
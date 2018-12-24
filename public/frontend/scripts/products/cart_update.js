$(document).ready(function (e) {
    $("input[id^='update_qty_item_']").change(function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('url'),
            type: 'get',
            data: {
                'qty': $(this).val()
            },
            success: function (data) {
                if (data &&  data != 'invalid_number' && data != 'invalid_quantity' && data != 'invalid_rowId') {
                    var cart_container = $('#cart_container');
                    var cart_header = $('#cart_header');
                    var cart_count = $('#cart_count');
                    cart_header.html('');
                    if (data[0] != 0) {
                        cart_header.append('<a href="/orders/create" class="btn btn-xs btn-primary pull-left xxs-mt-5 xxs-mr-5">انشاء الطلب </a>');
                        cart_header.append('<a href="/cart/view" class="btn btn-xs btn-dark pull-left xxs-mt-5 xxs-mr-5">سلة الشراء</a>');
                        cart_header.append('<a href="/cart/destroy" class="btn btn-xs btn-danger pull-left xxs-mt-5 xxs-mr-5">إفراغ السله</a>')

                    }

                    cart_count.removeClass('opacity-0').html(data[0]);
                    cart_header.append('<h6 class="pull-right"><strong data-bind="cartItems"> ' + data[0] + '</strong> منتج فى سلة الشراء </h6>');
                    cart_container.html('');
                    for (var key in data[1]) {
                        cart_container.append('<h6>' + key + '</h6>');
                        for (var item in data[1][key]) {
                            cart_container.append('<div class="xxs-p-10 border-bottom-solid-midgray-1 clearfix"> <a href="/products/'+data[1][key][item].id+'"class="btn btn-primary btn-link no-underline text-bold font-jfflat">' + data[1][key][item].name + '</a> <a href="/cart/removeItem/' + data[1][key][item].rowId + '" data-action="deleteCartItem"class="pull-left xxs-mt-5 xxs-p-5 icon icon-xs icon-close"></a> </div>');
                        }
                    }
                    $(this).val(data[2]);
                    $('#cart_total_top').html(data[3]);
                    $('#cart_total_bottom_'+data[5]).html(data[4]+ ' ريال');
                    $('#item_qty_'+data[5]).html('متوفر '+ data[6] + ' قطع فقط!');
                    swal({
                        title: 'تم تعديل المنتج فى سلة الشراء',
                        text: 'يمكنك مواصلة التسوق او اتمام الطلب',
                        type: 'success',
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });


                }
                else if(data =='invalid_quantity'){
                    swal({
                        title: 'خطأ',
                        text: 'عفوا هذه الكمية غير موجوده الان',
                        type: 'error',
                        timer: 2500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }else  if (data == "invalid_number"){
                    swal({
                        title: 'خطأ',
                        text: 'يجب ادخال ارقام فقط فى خانة الكميه',
                        type: 'error',
                        timer: 2500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }else if(data = 'invalid_rowId'){
                    swal({
                        title: 'خطأ',
                        text: 'عفواً هذا المنتج غير موجود فى الكارت',
                        type: 'error',
                        timer: 2500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }
            },
            error: function (data) {
                data = JSON.parse(data.responseText);
                if (data.error == 'Unauthenticated.') {
                    swal({
                        title: 'خطأ',
                        html: 'رجاء تسجيل الدخول من <a href="/login"> هنا  </a>',
                        type: 'error',
                        timer: 5000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                    return;
                } else {
                    swal({
                        title: 'خطأ',
                        text: 'حدث خطأ غير متوقع, رجاء المحاولة مرة اخري',
                        type: 'error',
                        timer: 2500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }
            }
        });
    });
});

$(document).ready(function (e) {
    $(document).on('click', '#add_to_cart, [data-action=add_to_cart]', function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            type: 'get',
            success: function (data) {
                if (data && data!='faild' && data != 'empty_product' && data != 'auction_product') {
                    var cart_container = $('#cart_container');
                    var cart_header = $('#cart_header');
                    var cart_count = $('#cart_count');
                    cart_header.html('');
                    if (data[0] != 0) {
                        cart_header.append('<a href="/orders/create" class="btn btn-xs btn-primary pull-left xxs-mt-5 xxs-mr-5 skip-margin">انشاء الطلب </a>');
                        cart_header.append('<a href="/cart/view" class="btn btn-xs btn-dark pull-left xxs-mt-5 xxs-mr-5 skip-margin">سلة الشراء</a>');
                        cart_header.append('<a href="/cart/destroy" class="btn btn-xs btn-danger pull-left xxs-mt-5 skip-margin">إفراغ السله</a>')

                    }

                    cart_count.removeClass('opacity-0').html(data[0]);
                    cart_header.append('<h6 class="pull-right"><strong data-bind="cartItems"> ' + data[0] + '</strong> منتج فى سلة الشراء </h6>');
                    cart_container.html('');
                    for (var key in data[1]) {
                        cart_container.append('<h6 class="xxs-pr-20 xxs-pl-20 xxs-mr-5 xxs-mt-15 xxs-mb-0">' + key + '</h6>');
                        for (var item in data[1][key]) {
                            cart_container.append('<div class="xxs-p-10 border-bottom-solid-midgray-1 z-cart-item clearfix"> <a href="/products/'+data[1][key][item].id+'"class="btn btn-primary btn-link no-underline text-bold font-jfflat prod-item">' + data[1][key][item].name + '</a> <a href="/cart/removeItem/' + data[1][key][item].rowId + '" data-action="deleteCartItem"class="pull-left xxs-mt-5 xxs-p-5 icon icon-xs icon-trash"></a> </div>');
                        }
                    }
                    swal({
                        title: 'تم إضافة المنتج الي سلة الشراء',
                        text: 'يمكنك مواصلة التسوق او اتمام الطلب',
                        type: 'success',
                        timer: 2500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });


                }
                else if(data =='faild'){
                    swal({
                        title: 'خطأ',
                        text: 'عفوا تم انتهاء الكمية',
                        type: 'error',
                        timer: 3500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }else  if (data == "empty_product"){
                    swal({
                        title: 'خطأ',
                        text: 'هذا المنتج غير موجود',
                        type: 'error',
                        timer: 3500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }else  if (data == "auction_product"){
                    swal({
                        title: 'خطأ',
                        text: 'لا يمكنك إضافة المزاد الى سلة الشراء',
                        type: 'error',
                        timer: 3500,
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
                        timer: 3500,
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

$(document).on('click', '.action-like , .action-dislike', function (e) {
    e.preventDefault();
    if (checkAuth()) {
        var is_liked = $(this).attr('like');
        var $pcontainer = $(this).parents('.product-actions');
        var product_id = $pcontainer.find('.get-product-id').val();
        var likes_url = $pcontainer.find('.likes-url').val();
        $.ajax({
            url: likes_url,
            type: 'post',
            data: {product_id: product_id, is_liked: is_liked, _token: $('meta[name="csrf_token"]').attr('content')},
            success: function (data) {
                if (data != 'not') {
                    $('.like' + product_id).children('span').html(data.likes);
                    $('.dislike' + product_id).children('span').html(data.dislikes);
                    if (data.is_liked == 1) {

                        $('.change-like' + product_id).toggleClass('is-like');
                        $('.change-dislike' + product_id).removeClass('is-dislike');
                    }
                    if (data.is_liked == 0) {
                        $('.change-like' + product_id).removeClass('is-like');
                        $('.change-dislike' + product_id).toggleClass('is-dislike');
                    }
                }
            }
        });
    }

});

$(document).on('click', '.action-favorite', function (e) {
    e.preventDefault();
    if (checkAuth()) {
        var $pcontainer = $(this).parents('.product-actions');
        var product_id = $pcontainer.find('.get-product-id').val();
        var favorites_url = $pcontainer.find('.favorites-url').val();
        $.ajax({
            url: favorites_url,
            type: 'post',
            data: {product_id: product_id, _token: $('meta[name="csrf_token"]').attr('content')},
            success: function (data) {
                if (data != 'not') {
                    if (data == '1') {
                        $('.action-favorite').removeClass('favorite');
                        $('.action-favorite').addClass('is-favorite');
                    } else {
                        $('.action-favorite').addClass('favorite');
                        $('.action-favorite').removeClass('is-favorite');
                    }
                }

            }
        });
    }
});

function checkAuth() {
    var isGuest = $('meta[name="isGuest"]').attr('content');
    if (isGuest) {
        swal({
                title: "رجاء تسجيل الدخول اولا",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                cancelButtonText: "اغلاق",
                confirmButtonText: "تسجيل الدخول",
                closeOnConfirm: false
            },
            function () {
                window.location='/login';
            });
    }
    else{
        return true;
    }
}

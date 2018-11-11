$(window).on('load', function () {
    waterfall();
    var image_data = [{
            "src": "pic1.png"
        },
        {
            "src": "pic2.png"
        },
        {
            "src": "pic3.png"
        },
        {
            "src": "pic4.png"
        },
        {
            "src": "pic5.png"
        },
        {
            "src": "pic6.png"
        },
        {
            "src": "pic7.png"
        },
        {
            "src": "pic8.png"
        },
        {
            "src": "pic9.png"
        },
        {
            "src": "pic10.png"
        },

    ];
    $(window).on('scroll', function () {
        if (checkScrollSlide) {
            $.each(image_data, function (key, value) {
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                var oImg = $('<img>').attr("src", 'image/' + $(value).attr("src")).appendTo(oPic);
               // console.log($(value), key)
            })
            waterfall();
        }
    })
})

function waterfall() {
    var $box = $('#main>div');
    var boxWidth = $box.eq(0).outerWidth(); //包括padding margin
    var cols = Math.floor($(window).width() / boxWidth);
    $('#main').width(boxWidth * cols).css('margin', '0 auto');

    var hArr = [];

    $box.each(function (index, value) {
        var height = $box.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = height; //存储每列的高度;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr);
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * boxWidth + 'px'
            });
            hArr[minHIndex] += $box.eq(index).outerHeight();
        }
    })
    //console.log(hArr);

}

function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDistance = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentHeight = $(window).height();
    return (lastBoxDistance < screenTop + documentHeight) ? true : false;
}
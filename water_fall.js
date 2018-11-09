(function () {
    var waterfall = {};
    var image_data = {
        "data": [{
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
        ]
    }
    
    waterfall.draw = function (parent, box) {
        //取出parent下class为所有 class = box 的元素
        var oParent = document.getElementById(parent);
        var oBox = getByClass(oParent, box);
        //console.log(oBox);
        //计算整个页面显示的列数 (pageWidth / boxWidth)
        var oBoxWidth = oBox[0].offsetWidth;
        var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);
        //console.log("oboxWidth",oBoxWidth,cols);
        //get main的宽,设置居中;
        oParent.style.cssText = 'width:' + oBoxWidth * cols + 'px;margin:0 auto;';

        //存放每一列高度的数组；
        //下一列的最长，加在最短的下边;left = ...,i total width;
        var hArr = []; //存储所有列的高;丢到全局之后发现无法更新数据
        for (var i = 0; i < oBox.length; i++) {
            //若列不够主体宽;
            if (i < cols) {
                hArr.push(oBox[i].offsetHeight);
                //get [x,x,x,x,x...];
            } else {
                //求出最小列的高
                var minH = Math.min.apply(null, hArr)
                var minIndex = getMinHIndex(hArr, minH);
                oBox[i].style.position = 'absolute';
                oBox[i].style.top = minH + 'px';
                oBox[i].style.left = oBox[minIndex].offsetLeft + 'px';
                //将列中数据更新;
                hArr[minIndex] += oBox[i].offsetHeight;
                //update to [x,x,x,minH+offset,...];
            }
        }

        //console.log(hArr)


    }; //end init;

    //end onscroll
    function getByClass(parent, className) {
        var boxArr = []; // save elements which class = box;
        var oElements = parent.getElementsByTagName('*'); //childs under parents;

        for (var i = 0; i < oElements.length; i++) {
            if (oElements[i].className === className) {
                boxArr.push(oElements[i]);
            }
        }
        return boxArr;
    } //end getByClass;
    function getMinHIndex(arr, val) {
        for (var i in arr) {
            if (arr[i] == val) {
                return i;
            }
        }
    } //end getMinHindex
    /*
    //check whether needs to load image
    //
    */
    function checkScrollSlide() {
        var oParent = document.getElementById('main');
        var oBox = getByClass(oParent, 'box');
        //列高
        var lastBoxHeight = oBox[oBox.length - 1].offsetTop + Math.floor(oBox[oBox.length - 1].offsetHeight / 2); //最后的元素+加载的一半;
        //页面滚动高
        //console.log(document.documentElement.scrollTop)
        var scrollTop =document.documentElement.scrollTop;
        var height = document.body.clientHeight || document.documentElement.clientHeight;
        //console.log("in function",lastBoxHeight,scrollTop,height)
        return (lastBoxHeight < scrollTop + height) ? true : false;
    } //end checkScrollSlide

    window.onscroll = function () {
        //console.log(checkScrollSlide());
        if (checkScrollSlide()) {
            //XMLHttpRequest x = new XMLHttpRequest();
            var oParent = document.getElementById("main");
            for (var i = 0; i < image_data.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = "box";
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = "image/" + image_data.data[i].src;
                oPic.appendChild(oImg);
                //console.log(oImg.src,oBox,oPic,oImg)
                }
                
        }
        //console.log("sss")
        waterfall.update();
    }
    waterfall.update = function(){
        waterfall.draw('main','box')
    }
    window.waterfall = waterfall;
    
})();
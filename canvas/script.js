    var getPixelRatio = function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    //获取画布对象
    var canvas = document.getElementById("canvas");
    //设置画布为2D方式
    var context = canvas.getContext("2d");
    
    var ratio = getPixelRatio(context);
    // 注意，这里的 width 和 height 变成了 width * ratio 和 height * ratio
    // context.drawImage(document.querySelector('img'), 0, 0, 300 * ratio, 90 * ratio);

    //获取浏览器窗口的宽度和高度
    var w = window.innerWidth;
    var h = window.innerHeight;
    //设置画布的宽度和高度
    canvas.width = w;
    canvas.height = h;
    //设置雪片数量
    var num = 100;
    //定义雪花数组
    var snows = [];
    for (var i = 0; i < num; i++) {
        //向数组填充元素，元素属性有坐标及半径，均为随机生成，其中半径上限为5
        snows.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 5,
        });
    };
    //绘制图片
    var img = new Image();
    img.src = "canvas/smile.png"
    function draw() {
        
        context.clearRect(0, 0, w, h); //清空画布
        context.beginPath(); //画笔开始
        for (var i = 0; i < num; i++) {
            var snow = snows[i];
            // context.fillStyle = "rgba(255,255,255,0.5)"; //设定填充方式为白色半透明
            // context.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2); //根据属性绘制圆形
            // context.moveTo(snow.x, snow.y); //画笔移动到指定坐标处
            context.drawImage(img,snow.x,snow.y,60,60);
        }
        context.fill(); //填充路径
        //雪片落下
        move();
    };
    function move() {
        for (var i = 0; i < num; i++) {
            var snow = snows[i];
            snow.y += (7 - snow.r) / 10 //根据雪片大小调整落下速度
            if(snow.y > h){ //如果雪片超出画布范围，则在顶端重绘
                snows[i]={x:Math.random() * w,y:0,r:snow.r}
            }
        }
    };
    //执行和调用函数
    draw();
    setInterval(draw, 1); //每隔一毫秒重绘一次
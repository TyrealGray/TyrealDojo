(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        root.terrainCore = factory();
    }
} (this, function () {

    function drawShape(context, point, sideNumber, size, text) {

        text = text ? text : '0';

        var angle = Math.PI * 2 / sideNumber //旋转的角度
        context.save(); //保存状态

        context.font = "13px Georgia";
        context.fillText(text, point.x , point.y );
        context.fillStyle = 'rgba(0,0,0,0)'; //填充透明
        context.strokeStyle = 'rgb(225,1,1)'; //填充绿色
        context.lineWidth = 0.5; //设置线宽
        context.translate(point.x, point.y); //原点移到x,y处，即要画的多边形中心
        context.moveTo(0, - size); //据中心r距离处画点
        context.beginPath();
        context.rotate(30 / 180 * Math.PI)
        for (var index = 0; index < sideNumber; ++index) {
            context.rotate(angle) //旋转
            context.lineTo(0, - size); //据中心r距离处连线
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore(); //返回原始状态
    }

    function getShapeHight(size){
        return size * Math.cos(30.0 / 180.0 * Math.PI);
    }

    return {
        drawShape: drawShape,
        getShapeHight: getShapeHight
    };

}));


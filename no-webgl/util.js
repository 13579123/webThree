const util = (function () {
    /** @type CanvasRenderingContext2D */
    const ctx = document.querySelector("canvas").getContext("2d")
    const width = ctx.canvas.width , height = ctx.canvas.height
    ctx.clearRect(0,0,width,height)
    
    /* 颜色翻译 */
    function translateColor(r , g , b) {
        for (let i = 0; i < arguments.length; i++)
            if (arguments[i] > 255) arguments[i] = 255
            else if (arguments[i] < 0) arguments[i] = 0
        r = Math.ceil(r)
        g = Math.ceil(g)
        b = Math.ceil(b)
        r = r.toString(16)
        if (r.length <= 1) r = '0' + r
        g = g.toString(16)
        if (g.length <= 1) g = '0' + g
        b = b.toString(16)
        if (b.length <= 1) b = '0' + b
        return `#${r}${g}${b}`
    }
    
    /* 画点 */
    function drawDot(x , y , r = 0, g = 0, b = 0) {
        ctx.beginPath()
        ctx.fillStyle = translateColor(r || 0, g || 0, b || 0)
        ctx.fillRect(x + width / 2 , y + height / 2 , 5 , 5)
        ctx.closePath()
    }
    
    /* 划线 */
    function setLine(x1 , y1 , x2 , y2 , r = 0 , g = 0 , b = 0) {
        ctx.beginPath()
        ctx.moveTo(x1 + width / 2 , y1 + height / 2)
        ctx.lineTo(x2 + width / 2 , y2 + height / 2)
        ctx.lineWidth = 2
        ctx.strokeStyle = translateColor(r || 0, g || 0, b || 0)
        ctx.stroke()
        ctx.closePath()
    }
    
    /* 清除画布 */
    function clearCanvas(x = 0, y = 0, w = width, h = height) {
        //开始绘制
        ctx.beginPath()
        ctx.fillStyle = "#000"
        ctx.fillRect(x , y , w + x , h + y)
        ctx.closePath()
    }
    
    /* 直接清除画布 */
    clearCanvas()
    
    return {
        clearCanvas ,
        setLine,
        drawDot,
    }
})()

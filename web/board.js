/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    painting = false,
    lastX = 0,
    lastY = 0,
    lineThickness = 1;

canvas.width = canvas.height = 600;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, 600, 600);

canvas.onmousedown = function(e) {
    painting = true;
    ctx.fillStyle = "#FF0000";
    lastX = e.pageX - this.offsetLeft;
    lastY = e.pageY - this.offsetTop;
};

canvas.onmouseup = function(e){
    painting = false;
}

canvas.onmousemove = function(e) {
    if (painting) {
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        // find all points between        
        var x1 = mouseX,
            x2 = lastX,
            y1 = mouseY,
            y2 = lastY;


        var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
        if (steep){
            var x = x1;
            x1 = y1;
            y1 = x;

            var y = y2;
            y2 = x2;
            x2 = y;
        }
        if (x1 > x2) {
            var x = x1;
            x1 = x2;
            x2 = x;

            var y = y1;
            y1 = y2;
            y2 = y;
        }

        var dx = x2 - x1,
            dy = Math.abs(y2 - y1),
            error = 0,
            de = dy / dx,
            yStep = -1,
            y = y1;
        
        if (y1 < y2) {
            yStep = 1;
        }
       
        lineThickness = 5 - Math.sqrt((x2 - x1) *(x2-x1) + (y2 - y1) * (y2-y1))/10;
        if(lineThickness < 1){
            lineThickness = 1;   
        }

        for (var x = x1; x < x2; x++) {
            if (steep) {
                ctx.fillRect(y, x, lineThickness , lineThickness );
            } else {
                ctx.fillRect(x, y, lineThickness , lineThickness );
            }
            
            error += de;
            if (error >= 0.5) {
                y += yStep;
                error -= 1.0;
            }
        }



        lastX = mouseX;
        lastY = mouseY;

    }
}



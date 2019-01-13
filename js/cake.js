var myCanvas = document.getElementById("cakeCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
var ctx = myCanvas.getContext("2d");

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}

function drawCakeSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var CakeChart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.draw = function () {
        var total_value = 0;
        var color_index = 0;
        var counter = 0;
        for (var categ in this.options.data) {
            if (counter++ >= this.options.numLimit) break;
            var val = this.options.data[categ];
            total_value += val;
        }
        var start_angle = 0;
        counter = 0;
        for (categ in this.options.data) {
            if (counter++ >= this.options.numLimit) break;
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;
            drawCakeSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width / 2, this.canvas.height / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );
            start_angle += slice_angle;
            color_index++;
        }
        start_angle = 0;
        counter = 0;
        for (categ in this.options.data) {
            if (counter++ >= this.options.numLimit) break;
            val = this.options.data[categ];
            slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
            var labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            var labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
            if (this.options.doughnutHoleSize) {
                var offset = (pieRadius * this.options.doughnutHoleSize) / 2;
                labelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
            }
            if (this.options.data[categ] > 0) {
                var labelText = Math.round(100 * val / total_value);
                this.ctx.strokeStyle = this.options.fontColor;
                if (this.options.font == undefined)
                    this.ctx.font = this.options.fontSize + "px Arial";
                else
                    this.ctx.font = this.options.fontSize + "px " + this.options.font;
                this.ctx.strokeText(labelText + "%", labelX, labelY);
                start_angle += slice_angle;
            }
        }
        if (this.options.legend) {
            color_index = 0;
            var legendHTML = "";
            for (var i = 0; i < this.options.nomsLlegenda.length; i++) {
                if (this.options.nomsLlegenda[i] != "")
                    legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + this.options.nomsLlegenda[i] + "</div>";
            }
            this.options.legend.innerHTML = legendHTML;
        }
    }
}

window.pieChart = CakeChart;
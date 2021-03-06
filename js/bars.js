var myCanvas = document.getElementById("barsCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}

var BarsChart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.draw = function () {
        var maxValue = 0;
        for (var categ in this.options.data) {
            maxValue = Math.max(maxValue, this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 5;
        var gridValue = 0;
        while (gridValue <= maxValue) {
            var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            if (this.options.font == undefined)
                this.ctx.font = "bold " + parseInt(this.options.fontSize) / 2 + "px Arial";
            else
                this.ctx.font = "bold " + parseInt(this.options.fontSize) / 2 + "px " + this.options.font;
            this.ctx.fillText(gridValue, 10, gridY - 2);
            this.ctx.restore();
            gridValue += this.options.gridScale;
        }
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth) / numberOfBars;
        barSize += parseInt(window.thickness);
        for (categ in this.options.data) {
            var val = this.options.data[categ];
            var barHeight = Math.round(canvasActualHeight * val / maxValue);
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex % this.colors.length]
            );
            barIndex++;
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

window.BarsChart = BarsChart;
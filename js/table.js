var cellsNum = 0;
var cellsNumValues = 0;
var cellsArray = [];
let initualNum = 4;
var rowsNum = 0;
var colsNum = 0;
var fontSize = 15;
var fontValue;
var fontColor = "black";
var colorsArray = [];
var legendNamesArray = [];
var doBars = false;
var doCake = false;
var doDonut = false;
var doSquares = false;
var doNegative = false;
var doSymmetry = false;
var doGrayscale = false;
let table = document.getElementById("tb");
window.thickness = document.getElementById("thickness").value * 1;

document.getElementById("checkbox01").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="optionBarres" onClick="activateBars()"> Bars';
document.getElementById("checkbox02").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="optionPastis" onClick="activateCake()"> Cake';
document.getElementById("checkbox03").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="optionDonut" onClick="activateDonut()"> Donut';
document.getElementById("checkbox04").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="optionQuadrats" onClick="activateSquares()"> Squares';

document.getElementById("checkboxBM01").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="optionBarres" onClick="activateNegative()"> Negative';
document.getElementById("checkboxBM02").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="optionPastis" onClick="activateSymmetry()"> Symmetry';
document.getElementById("checkboxBM03").innerHTML = '<input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="optionDonut" onClick="activateGrayscale()"> Grayscale';

for (var i = 0; i < initualNum; i++) {
    if (i < 2)
        insertRow();
    insertColumn();
}

function insertRow() {
    table.insertRow(-1);
    refreshTable();
}

function insertColumn() {
    cellsNum++;
    refreshTable();
}

function eliminaFila() {
    table.deleteRow(-1);
    refreshTable();
}

function removeColumn() {
    cellsNum--;
    refreshTable();
}

function refreshTable() {
    cellsNumValues = 0;
    rowsNum = 0;
    colsNum = 0;
    for (var fila = 0; fila < table.rows.length; fila++) {
        for (var index = table.rows[fila].cells.length; index < cellsNum; index++) {
            table.rows[fila].insertCell(-1);
        }
        for (var index = table.rows[fila].cells.length; index > cellsNum; index--) {
            table.rows[fila].deleteCell(-1);
        }
        for (var index = 0; index < table.rows[fila].cells.length; index++) {
            if (fila == 0) {
                table.rows[fila].cells[index].innerHTML = '<input type="text" id="HTag' + index + '" class="form-control" placeholder="" aria-describedby="basic-addon2" style="background-color:#a8c4ff;" onkeyup="createCharts()" />';
                colsNum++;
            } else {
                table.rows[fila].cells[index].innerHTML = '<input id="cell' + cellsNumValues + '" type="text" class="form-control" placeholder="" aria-describedby="basic-addon2" style="background-color:lightgray;" onkeyup="createCharts()" /> <input type="color" id="color' + cellsNumValues + '" class="form-control" value="' + '#' + Math.random().toString(16).substr(-6) + '" onChange="createCharts()" />';
                cellsNumValues++;
            }
        }
    }
}

function activateBars() {
    doBars = !doBars;
    if (doBars)
        document.getElementById("DownloadBarsText").innerText = "Download";
    else
        document.getElementById("DownloadBarsText").innerText = "";

    createCharts();
}

function activateCake() {
    doCake = !doCake;
    if (doCake)
        document.getElementById("DownloadCakeText").innerText = "Download";
    else
        document.getElementById("DownloadCakeText").innerText = "";
    createCharts();
}

function activateDonut() {
    doDonut = !doDonut;
    if (doDonut)
        document.getElementById("DownloadDonutText").innerText = "Download";
    else
        document.getElementById("DownloadDonutText").innerText = "";
    createCharts();
}

function activateSquares() {
    doSquares = !doSquares;
    if (doSquares)
        document.getElementById("DownloadSquaresText").innerText = "Download";
    else
        document.getElementById("DownloadSquaresText").innerText = "";
    createCharts();
}

function activateNegative() {
    doNegative = !doNegative;
    createCharts();
}

function activateSymmetry() {
    doSymmetry = !doSymmetry;
    createCharts();
}

function activateGrayscale() {
    doGrayscale = !doGrayscale;
    createCharts();
}

function changeThickness() {
    window.thickness = document.getElementById("thickness").value;
    createCharts();
}

function refreshCanvas(canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function createBars() {
    var cBars = document.getElementById("barsCanvas");
    refreshCanvas(cBars);
    var legend = document.getElementById("barsLegend");
    var myBarsChart = new window.BarsChart({
        canvas: cBars,
        padding: 10,
        gridScale: 5,
        gridColor: fontColor,
        data: cellsArray,
        colors: colorsArray,
        legend: legend,
        nomsLlegenda: legendNamesArray,
        font: fontValue,
        fontSize: fontSize
    });
    myBarsChart.draw();
    var context = cBars.getContext('2d');
    if (doNegative)
        applyNegative(context, cBars);
    if (doSymmetry)
        applySymmetry(context, cBars);
    if (doGrayscale)
        applyGrayscale(context, cBars);
}

function createSquares() {
    var cBars = document.getElementById("squaresCanvas");
    refreshCanvas(cBars);
    var legend = document.getElementById("squaresLegend");
    var myBarsChart = new window.SquaresChart({
        canvas: cBars,
        padding: 10,
        gridScale: 5,
        gridColor: fontColor,
        data: cellsArray,
        colors: colorsArray,
        legend: legend,
        nomsLlegenda: legendNamesArray,
        font: fontValue,
        fontSize: fontSize
    });
    myBarsChart.draw();
    var context = cBars.getContext('2d');
    if (doNegative)
        applyNegative(context, cBars);
    if (doSymmetry)
        applySymmetry(context, cBars);
    if (doGrayscale)
        applyGrayscale(context, cBars);
}

function applyGrayscale(context, canvas) {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i + 2];
        pixels[i + 1] = 255 - pixels[i + 2];
        pixels[i + 2] = 255 - pixels[i + 2];
    }
    context.putImageData(imageData, 0, 0);
}

function applyNegative(context, canvas) {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
    }
    context.putImageData(imageData, 0, 0);
}

function applySymmetry(ctx, canvas) {

    var width = canvas.width;
    var margin = 0;
    ctx.save();
    ctx.translate(width / 2, width / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, (-width + margin) / 2, -width / 2, width, width);
    ctx.restore();
}

function createCake() {

    var cPastis = document.getElementById("cakeCanvas");
    refreshCanvas(cPastis);
    var legend = document.getElementById("cakeLegend");

    var myCakeChart = new window.pieChart({
        canvas: cPastis,
        data: cellsArray,
        colors: colorsArray,
        legend: legend,
        nomsLlegenda: legendNamesArray,
        numLimit: legendNamesArray.length,
        font: fontValue,
        fontSize: fontSize,
        fontColor: fontColor
    });
    myCakeChart.draw();
    var context = cPastis.getContext('2d');
    if (doNegative)
        applyNegative(context, cPastis);
    if (doSymmetry)
        applySymmetry(context, cPastis);
    if (doGrayscale)
        applyGrayscale(context, cPastis);
}

function createDonut() {
    var cDonut = document.getElementById("donutCanvas");
    refreshCanvas(cDonut);
    var legend = document.getElementById("donutLegend");
    var myDonutChart = new window.DonutChart({
        canvas: cDonut,
        data: cellsArray,
        colors: colorsArray,
        doughnutHoleSize: 0.5,
        legend: legend,
        nomsLlegenda: legendNamesArray,
        numLimit: legendNamesArray.length,
        font: fontValue,
        fontSize: fontSize,
        fontColor: fontColor
    });
    myDonutChart.draw();
    var context = cDonut.getContext('2d');
    if (doNegative)
        applyNegative(context, cDonut);
    if (doSymmetry)
        applySymmetry(context, cDonut);
    if (doGrayscale)
        applyGrayscale(context, cDonut);
}

function createCharts() {
    var id = "cell";
    var colorId = "color";
    var verticalId = "etiquetaVertical";
    var horitzontalId = "HTag";
    for (var idNum = 0; idNum < cellsNumValues; idNum++) {
        if (!isNaN(document.getElementById(id + idNum).value)) {
            cellsArray[id + idNum] = document.getElementById(id + idNum).value * 1;
        }
    }
    legendNamesArray = [];
    for (var idNum = 0; idNum < colsNum; idNum++) {
        legendNamesArray[idNum] = document.getElementById(horitzontalId + (idNum)).value;
    }
    colorsArray = [];
    for (var idNum = 0; idNum < cellsNumValues; idNum++) {
        colorsArray.push(document.getElementById(colorId + idNum).value);
    }
    if (doBars)
        createBars();
    else {
        var cBars = document.getElementById("barsCanvas");
        document.getElementById("barsLegend").innerHTML = "";
        refreshCanvas(cBars);
    }
    if (doCake)
        createCake();
    else {
        var cBars = document.getElementById("cakeCanvas");
        document.getElementById("cakeLegend").innerHTML = "";
        refreshCanvas(cBars);
    }
    if (doDonut)
        createDonut();
    else {
        var cBars = document.getElementById("donutCanvas");
        document.getElementById("donutLegend").innerHTML = "";
        refreshCanvas(cBars);
    }
    if (doSquares)
        createSquares();
    else {
        var cBars = document.getElementById("squaresCanvas");
        document.getElementById("squaresLegend").innerHTML = "";
        refreshCanvas(cBars);
    }
}

function downloadBarsCanvas(link, filename) {
    link.href = document.getElementById('barsCanvas').toDataURL();
    link.download = filename;
}

document.getElementById('btnDownloadBars').addEventListener('click', function () {
    downloadBarsCanvas(this, 'bars.png');
}, false);

function downloadCakeCanvas(link, filename) {
    link.href = document.getElementById('cakeCanvas').toDataURL();
    link.download = filename;
}

document.getElementById('btnDownloadCake').addEventListener('click', function () {
    downloadCakeCanvas(this, 'cake.png');
}, false);

function downloadDonutCanvas(link, filename) {
    link.href = document.getElementById('donutCanvas').toDataURL();
    link.download = filename;
}

document.getElementById('btnDownloadDonut').addEventListener('click', function () {
    downloadDonutCanvas(this, 'donut.png');
}, false);


function downloadSquaresCanvas(link, filename) {
    link.href = document.getElementById('squaresCanvas').toDataURL();
    link.download = filename;
}

document.getElementById('btnDownloadSquares').addEventListener('click', function () {
    downloadSquaresCanvas(this, 'squares.png');
}, false);

function changeFontFamily(selectTag) {
    fontValue = selectTag.options[selectTag.selectedIndex].text;
    createCharts();
}

function changeFontSize() {
    fontSize = document.getElementById("fontSize").value;
    createCharts();
}

function changeFontColor() {
    fontColor = document.getElementById("fontColor").value;
    createCharts();
}
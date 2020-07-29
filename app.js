const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;

ctx.lineJoin = "round" // when 2 lines join, make it round
ctx.lineCap = "round" // end of the line will be rounded
ctx.lineWidth = 50;

let lastX = 0;
let lastY = 0;
let hue = 0

// function clearPath() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

//Set Rainbow Button

let rainbowBtnOn = false;
const rainbowBtn = document.getElementById("rainbowBtn");
rainbowBtn.addEventListener("click", rainbowBtnHandler)

function rainbowBtnHandler() {
    rainbowBtnOn = !rainbowBtnOn
    if (rainbowBtnOn) {
        rainbowBtn.classList.add("rainbowON")
    } else {
        rainbowBtn.classList.remove("rainbowON")
    }

}

// Set colorpicker

let colorPickerHandler = function (e) {
    let pickedColor = e.target.value
    ctx.strokeStyle = `${pickedColor}`
}

const colorPicker = document.getElementById("colorpicker")
colorPicker.addEventListener("change", colorPickerHandler)

// Draw

function draw(e) {
    if (!isDrawing) {
        return;
    }

    ctx.beginPath(); // initiate path

    if (rainbowBtnOn) {

        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
        hue++;
        if (hue > 360) {
            hue = 0;
        }
    }

    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY); // go to
    ctx.stroke(); // draw
    lastX = e.offsetX;
    lastY = e.offsetY;
    // clearPath();
}

// Set Line Width

const lineWidthSlider = document.getElementById("myRange");

function setWidthHandler() {
    ctx.lineWidth = lineWidthSlider.value;
}
lineWidthSlider.addEventListener("change", setWidthHandler)




//Set canvas to listen mousemovements
canvas.addEventListener("mousemove", draw, rainbowBtnHandler)
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
})
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})
canvas.addEventListener("mouseout", () => {
    isDrawing = false;
})
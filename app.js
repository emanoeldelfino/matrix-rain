const c = document.getElementById("matrix");
const ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;
ctx.fillRect(0, 0, c.width , c.height);

window.addEventListener("resize", () => {
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  columns = c.width / fontSize;
  drops = new Array(Math.floor(columns)).fill(c.height);
})

const letters = ["日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ",
                 "ｹ","ﾒ","ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".","=","*",
                 "+","-","<",">","¦","｜","ﾘ", "0", "1", "2", "3", "4", "5", "7", "8", "9"];

const fontSize = 18;

let columns = c.width / fontSize;

let drops = new Array(Math.floor(columns)).fill(c.height);

let dropSpeed = 1;

let color = "#0F0";
let colorCodes = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF", "#FFFFFF", "#9C9C9C"];
let colorKeys = "!@#$%^&*("
let letterQt = 0.05;

function draw() {
  ctx.fillStyle = `rgba(0, 0, 0, ${letterQt})`;
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px arial`;
  
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > c.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]+=dropSpeed;
  }
  window.requestAnimationFrame(draw);
  ctx.setTransform(1,0,0,1,0,0);
}

let drawSpeed = 1;
let rainbow = false;
let lastColor;
let rainbowId;
let key;
document.addEventListener("keydown", e => {
  key = e.key.toUpperCase();
  if (key === "ARROWUP" && dropSpeed > .05) {
    dropSpeed/=2;
  } else if (key === "ARROWDOWN" && dropSpeed < 2) {
    dropSpeed*=2;
  } else if (key === "W" && letterQt < 1) {
    letterQt*=2;
  } else if (key === "S" && letterQt > 0.05) {
    letterQt/=2;
  } else if (key === " " && drawSpeed < 15) {
    draw();
    drawSpeed++;
  } else if (key === "R") {
    if (!rainbow) {
      lastColor = color;
      rainbowId = setInterval(() => {
        do {
          color = randomColor();
        } while (contrast(hexToRgb(color), hexToRgb("#090609")) < 4.5);
      }, 5);
      rainbow = true;
    } else {
      clearInterval(rainbowId);
      color = lastColor;
      rainbow = false;
    }
  } else if (colorKeys.includes(key)) {
    color = colorCodes[colorKeys.indexOf(key)];
  } else if (key === ")") {
    do {
      color = randomColor();
    } while (contrast(hexToRgb(color), hexToRgb("#090609")) < 4.5);
  }
})

draw();

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, "0")}`;
}

// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05)
       / (darkest + 0.05);
}

// hex to rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
  ] : null;
}
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;
ctx.fillRect(0, 0, c.width , c.height);

window.addEventListener("resize", () => {
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  // ctx.fillRect(0, 0, c.width , c.height);
  columns = c.width / fontSize;
  drops = new Array(Math.floor(columns)).fill(c.height);
})

const letters = ["日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".","=","*","+","-","<",">","¦","｜","ﾘ", "0", "1", "2", "3", "4", "5", "7", "8", "9"];

const fontSize = 18;

let columns = c.width / fontSize;

let drops = new Array(Math.floor(columns)).fill(c.height);

let dropSpeed = 1;

let color = "#0F0";
let colorCodes = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF", "#FFFFFF", "#9C9C9C"];
let colorKeys = "!@#$%^&*("

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
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
}

let drawSpeed = 1;
let key;
document.addEventListener("keydown", e => {
  key = e.key.toUpperCase();
  console.log(key);
  if (key === "ARROWUP") {
    dropSpeed/=2;
  } else if (key === "ARROWDOWN") {
    dropSpeed*=2;
  } else if (key === " " && drawSpeed < 15) {
    draw();
    drawSpeed++;
  } else if (key === "R") {
    window.location.reload();
  } else if (colorKeys.includes(key)) {
    color = colorCodes[colorKeys.indexOf(key)];
  } else if (key === ")") {
    color = randomColor();
  }
})

draw();

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

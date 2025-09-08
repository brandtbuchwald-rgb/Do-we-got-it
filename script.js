const buildBtn = document.getElementById("build");
const resetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("download");
const canvas = document.getElementById("infographic");
const ctx = canvas.getContext("2d");

// "design" resolution
const DESIGN_WIDTH = 480;
const DESIGN_HEIGHT = 640;

function resizeCanvas() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, 1);
  canvas.style.width = DESIGN_WIDTH * scale + "px";
  canvas.style.height = DESIGN_HEIGHT * scale + "px";
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

buildBtn.addEventListener("click", () => {
  // Get input values
  const baseStats = {
    ATK: document.getElementById("atk").value,
    DEF: document.getElementById("def").value,
    HP: document.getElementById("hp").value,
  };

  const randomOptions = [
    document.getElementById("opt1").value,
    document.getElementById("opt2").value,
    document.getElementById("opt3").value,
    document.getElementById("opt4").value,
  ];

  // Draw canvas
  canvas.width = DESIGN_WIDTH;
  canvas.height = DESIGN_HEIGHT;

  // background
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#caa64d";
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // title
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 22px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Hunter Gear Sheet", canvas.width / 2, 50);

  // portrait placeholder
  ctx.beginPath();
  ctx.arc(240, 150, 50, 0, 2 * Math.PI);
  ctx.fillStyle = "#555577";
  ctx.fill();

  // gear slots placeholders
  const gearSlots = [
    [100, 60], [240, 40], [360, 60],
    [100, 150], [360, 150],
    [100, 240], [240, 260], [360, 240]
  ];
  ctx.fillStyle = "#444";
  gearSlots.forEach(([x, y]) => ctx.fillRect(x, y, 60, 60));

  // base stats
  ctx.textAlign = "left";
  ctx.font = "18px Arial";
  let y = 360;
  for (let [name, value] of Object.entries(baseStats)) {
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${name}: ${value}`, 50, y);
    y += 35;
  }

  // divider
  ctx.strokeStyle = "#555";
  ctx.beginPath();
  ctx.moveTo(40, y);
  ctx.lineTo(440, y);
  ctx.stroke();
  y += 20;

  // random options
  ctx.font = "17px Arial";
  randomOptions.forEach(opt => {
    ctx.fillStyle = "#66ccff";
    ctx.fillText(opt, 50, y);
    y += 30;
  });
});

// reset
resetBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// download
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "hunter_gear_sheet.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

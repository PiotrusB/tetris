// sorry Stefan że twoje oczy zostały wypalone przez mój kod
let o = [
[true, true],
[true, true]
];
let i = [
[false, true, false, false], 
[false, true, false, false],
[false, true, false, false],
[false, true, false, false]
];
let s = [
[false, false, false],
[false, true, true],
[true, true, false],
];
let z = [
[false, false, false],
[true, true, false],
[false, true, true]
];
let l = [
[true, false, false, false],
[true, false, false, false],
[true, false, false, false],
[true, true, true, false]
];
let j = [
[false, false, true, false],
[false, false, true, false],
[false, false, true, false],
[true, true, true, false]
];
let t = [
[false, false, false],
[true, true, true],
[false, true, false]
];
let shapes = [o, i, s, z, l, j, t];
let index = 0;
let place = 0;
let lift = 0;
let iterations = 0;
let grid = [];
let rotation = 0;
let currentShape = [];
let blockFallenFlag = false;
let gridNext = [];
function setup() {
createCanvas(200, 400);
background(0, 0, 0);
for(let y = 0; y < 20; y++) {
grid[y] = [];
for(let x = 0; x < 10; x++) {
grid[y][x] = false;
}
}
for(let y = 0; y < 20; y++) {
gridNext[y] = [];
for(let x = 0; x < 10; x++) {
gridNext[y][x] = false;
}
}
index = int(random(shapes.length));
currentShape = shapes[index];
}

function draw() {
iterations++;
background(0);
line(0, 400, 200, 401);
for(let x = 0; x < 10; x++) {
for(let y = 0; y < 20; y++) {
if(grid[y][x]) {
fill(0, 255, 0);
rect(x*20, y*20, 20, 20);
}
}
}
drawBrick(place, lift, currentShape);
if((iterations % 10) == 0) {
lift++;
let collision = false; // ← moved here to avoid resetting inside the loop
for(let x = 0; x < currentShape.length; x++) {
for(let y = 0; y < currentShape.length; y++) {
if(currentShape[y][x]) {
let px = constrain(x+place, 0, 9);
let py = constrain((y+lift), 0, 19);
if(grid[py][px]) {
collision = true;
}
gridNext[constrain((y+lift)-1, 0, 19)][px] = true;
}
}
}
if(collision) {
blockFallen();
}
for(let x = 0; x < 10; x++) {
for(let y = 0; y < 20; y++) {
gridNext[y][x] = false;
}
}
}
if(((lift + currentShape.length) - bottomEmpty(currentShape)) > 20) {
blockFallen();
}
text(place, 20, 500);
}


function keyPressed() {
if(keyCode === LEFT_ARROW) {
place--;

}
if(keyCode === RIGHT_ARROW) {
place++;
}
if(keyCode === UP_ARROW) {
rotateArray(currentShape);
}
//place = constrain(place, 0, 9);
}

function blockFallen() {
let size = currentShape.length;
for(let x = 0; x < size; x++) {
for(let y = 0; y < size; y++) {
if(currentShape[y][x]) {
grid[constrain((y+lift)-1, 0, 19)][constrain(x+place, 0, 9)] = true;
}
}
}
lift = 0;
newBlock();
}

function newBlock() {
index = int(random(shapes.length));
currentShape = shapes[index];
}

function drawBrick(xPos, yPos, flavor) {
let size = flavor.length;
fill(0, 255, 100);
stroke(0, 50, 255);
strokeWeight(1);

for(let x = 0; x < size; x++) {
for(let y = 0; y < size; y++) {
if(flavor[y][x]) {
rect((x*20)+xPos*20, (y*20)+yPos*20, 20, 20);
}
}
}
}

function rotateArray(matrix) {
const N = matrix.length;
for (let i = 0; i < N; i++) {
for (let j = i + 1; j < N; j++) {
let temp = matrix[i][j];
matrix[i][j] = matrix[j][i];
matrix[j][i] = temp;
}
}
for (let i = 0; i < N; i++) {
matrix[i].reverse();
}
}

function bottomEmpty(shape) {
let size = shape.length;
let containsSomething = false;
let emptyLines = 0;
for(let y = 0; y < size; y++) {
containsSomething = false;
for(let x = 0; x < size; x++) {
if(shape[y][x]) {
containsSomething = true;
}
}
if(containsSomething) {emptyLines = 0;}
else {
emptyLines++;
}
}
return emptyLines;
}


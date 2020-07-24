class Stopwatch {
    constructor(){
        this.time = Date.now();
    };
    stop() {
        return Date.now() - this.time;
    }
};

class Position {
    x = 0;
    y = 0;

    constructor(xpos, ypos){
        this.x = xpos;
        this.y = ypos;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    add(pos){
        this.x += pos.x;
        this.y += pos.y;
    }

    added(pos){
        let p = new Position(0, 0);
        p.setX(this.x + pos.x);
        p.setY(this.y + pos.y);
        return p;
    }
}

var canvas = document.getElementById('fractals');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

function drawTriangle(pos1, pos2){
    x = pos1.getX()
    ctx.beginPath();
    ctx.moveTo(pos1.getX(), pos1.getY());
    ctx.lineTo(pos2.getX(), pos2.getY());
    ctx.fill();
}

var pow = 1.3;
var coef = 3;
var angle1 = 0.5;
var angle2 = 0.5;
var power = 15;
var startPosition = new Position(700, 700);
var startAngleRad = -1.5708;
var lineStyle = 'round';
var boldness = 1;
var bgcolor = '#ffffff';

function applyChanges(){
    pow = parseFloat(document.getElementById('pow').value);
    coef = parseFloat(document.getElementById('coef').value);
    angle1 = parseFloat(document.getElementById('angle1').value);
    angle2 = parseFloat(document.getElementById('angle2').value);
    power = parseFloat(document.getElementById('power').value);
    let sx = parseFloat(document.getElementById('startposx').value);
    let sy = parseFloat(document.getElementById('startposy').value);
    startPosition = new Position(sx, sy);
    startAngleRad = parseFloat(document.getElementById('startangle').value);
    lineStyle = document.getElementById('style').value;
    boldness = parseFloat(document.getElementById('boldness').value);
    bgcolor = document.getElementById('bgcolor').value;

    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    new Fractals().binaryTree(power, startPosition, startAngleRad);
    //alert('abc')
}

ctx.fillStyle = bgcolor;
ctx.fillRect(0, 0, canvas.width, canvas.height)

function drawLine(pos1, pos2, bold=0, color='#000000'){
    ctx.lineWidth = bold;
    ctx.lineCap = lineStyle;
    ctx.strokeStyle = color;
    ctx.beginPath(); 
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
}

class Fractals {
    binaryTree(n, pos, angle) {
        if (n == 0){
            return;
        }
        let pos1 = pos.added(new Position(Math.cos(angle) * Math.pow(pow, n) * coef, Math.sin(angle) * Math.pow(pow, n) * coef));
        let pos2 = pos.added(new Position(Math.cos(-angle) * Math.pow(pow, n) * coef, Math.sin(angle) * Math.pow(pow, n) * coef));
        //let pos1 = pos.added(new Position(Math.cos(angle) * n * 8, Math.sin(angle) * n * 8));
        //let pos2 = pos.added(new Position(Math.cos(-angle) * n * 8, Math.sin(angle) * n * 8));
        /**drawLine(pos, pos1, n, this.treeGradient(n, 15));
        requestAnimationFrame(() => {this.binaryTree(n - 1, pos1, angle - 0.5);})
        drawLine(pos, pos2, n, this.treeGradient(n, 15));
        requestAnimationFrame(() => {this.binaryTree(n - 1, pos2, angle + 0.5);})**/
        drawLine(pos, pos1, n * boldness, this.treeGradient(n, power));
        requestAnimationFrame(() => {
            this.binaryTree(n - 1, pos1, angle - angle1);
            drawLine(pos, pos2, n * boldness, this.treeGradient(n, power));
            requestAnimationFrame(() => {this.binaryTree(n - 1, pos2, angle + angle2);});
        });
    }

    trinaryTree(n, pos, angle) {
        if (n == 0){
            return;
        }
        let pos1 = pos.added(new Position(Math.cos(angle) * Math.pow(pow, n) * coef, Math.sin(angle) * Math.pow(pow, n) * coef));
        let pos2 = pos.added(new Position(Math.cos(-angle) * Math.pow(pow, n) * coef, Math.sin(angle) * Math.pow(pow, n) * coef));
        let pos3 = pos.added(new Position(Math.cos(-angle) * Math.pow(pow, n) * coef, Math.sin(angle) * Math.pow(pow, n) * coef));
        //let pos1 = pos.added(new Position(Math.cos(angle) * n * 8, Math.sin(angle) * n * 8));
        //let pos2 = pos.added(new Position(Math.cos(-angle) * n * 8, Math.sin(angle) * n * 8));
        /**drawLine(pos, pos1, n, this.treeGradient(n, 15));
        requestAnimationFrame(() => {this.binaryTree(n - 1, pos1, angle - 0.5);})
        drawLine(pos, pos2, n, this.treeGradient(n, 15));
        requestAnimationFrame(() => {this.binaryTree(n - 1, pos2, angle + 0.5);})**/
        drawLine(pos, pos1, n * boldness, this.treeGradient(n, power));
        requestAnimationFrame(() => {
            this.binaryTree(n - 1, pos1, angle - angle1);
            drawLine(pos, pos2, n * boldness, this.treeGradient(n, power));
            requestAnimationFrame(() => {this.binaryTree(n - 1, pos2, angle + angle2);});
        });
    }

    treeGradient(n, max){
        n = Math.round(n / max * 255);
        return '#' + n.toString(16).padStart(2, '0') + (256 - n).toString(16).padStart(2, '0') + '00';
        //return '#' + n.toString(16).padStart(2, '0') + 'ff00';
    }
}

//let sw = new Stopwatch();
new Fractals().binaryTree(power, startPosition, startAngleRad);
//console.log(sw.stop());


//drawLine(new Position(100, 100), new Position(200, 200), 50);

// эта программа рисует дерево.
"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

function getRandomFloatFromRange(min, max) {
    // Not inclusive of "max" param
    return Math.random() * (max - min) + min;
}

class Root {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = getRandomFloatFromRange(-2, 2);
        this.speedY = getRandomFloatFromRange(-2, 2);
        this.maxSize = getRandomFloatFromRange(5, 12);
        this.size = getRandomFloatFromRange(2, 3);
        this.velocityOfSize = getRandomFloatFromRange(0.05, 0.2);
        this.angle = 0;
        this.velocityOfAngle = getRandomFloatFromRange(0.3, 0.9);

        this.lightness = 10;
    }

    update() {
        this.x += this.speedX + Math.sin(this.angle);
        this.y += this.speedY + Math.sin(this.angle);
        this.size += this.velocityOfSize;
        this.angle += this.velocityOfAngle;

        if (this.lightness < 70) {
            this.lightness += 0.25;
        }

        if (this.size < this.maxSize) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(140, 100%, ${this.lightness}%)`;
            ctx.fill();
            ctx.stroke();

            // Animate
            requestAnimationFrame(this.update.bind(this));
        }
    }
}

window.addEventListener("mousemove", (event) => {
    const root = new Root(event.x, event.y);

    root.update();
});
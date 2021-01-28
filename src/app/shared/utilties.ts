import { Injectable } from '../../../node_modules/@angular/core';
@Injectable()
export class UtilitiesService {
  constructor() {
  }

  clearTheDOM() {
    const dymanicEle = document.getElementById("dymanic_elements");
    dymanicEle.innerHTML = '';
  }

  createCanvas(userCommand) {
    const canvasEle = document.getElementById("canvas");
    const dymanicEle = document.getElementById("dymanic_elements");
    if (!canvasEle) {
      const canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      canvas.width = userCommand[1];
      canvas.height = userCommand[2];
      dymanicEle.appendChild(canvas);
    } else {
      canvasEle.parentNode.removeChild(canvasEle);
      this.createCanvas(userCommand);
    }
  }

  drawRectangle(canvas, width, height) {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(1, 1, width, height);
  }
}

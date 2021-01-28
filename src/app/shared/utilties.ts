import { Injectable } from '../../../node_modules/@angular/core';
@Injectable()
export class UtilitiesService {
  constructor() {
  }

  createCanvas(userCommand) {
    const canvasEle = document.getElementById("canvas");
    if (!canvasEle) {
      const canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      canvas.width = userCommand[1];
      canvas.height = userCommand[2];
      document.body.appendChild(canvas);
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

  isNumeric(input) {
   return typeof input === 'number' ? true: false;
  }
}

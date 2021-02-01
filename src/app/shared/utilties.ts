import { Injectable } from '../../../node_modules/@angular/core';
import { messages } from '../shared/custom-messages';
@Injectable()
export class UtilitiesService {
  constructor() {
  }

  clearTheDOM() {
    const dymanicEle = document.getElementById("dymanic_elements");
    dymanicEle.innerHTML = '';
  }

  // clear the entire canvas
  // cleanCanvas(canvas, ctx) {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  // }

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

  drawLine(canvasEle, userCommand) {
    let ctx = this.resetCanvas(canvasEle);
    ctx.beginPath();
    ctx.moveTo(userCommand[1], userCommand[2]); // defines the starting point of the line (x1,y1)
    ctx.lineTo(userCommand[3], userCommand[4]); // defines the ending point of the line (x2,y2)
    ctx.stroke();
  }

  drawRectangle(canvasEle, userCommand) {
    let ctx = this.resetCanvas(canvasEle);
    ctx.fillRect(userCommand[3], userCommand[1], userCommand[2], userCommand[4]); // fills a rectangle positioned at x and y, with a width and height of w and h.
  }

  bucketFill(canvasEle, userCommand) {
    let ctx = this.resetCanvas(canvasEle);
    ctx.fillStyle = userCommand[3];
    ctx.fillRect(userCommand[1], userCommand[2], canvasEle.width, canvasEle.height);
  }

  resetCanvas(canvasEle) {
    var ctx = canvasEle.getContext("2d");
    ctx.lineWidth = 5;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = "#ffffff";
    return ctx;
  }

  invalidCommandMsg(type) {
    return messages[type];
  }

  getCanvasElement() {
    return <HTMLCanvasElement>document.getElementById("canvas");
  }

  analyzUserCommand(useInput) {
    let userInputs = useInput ? useInput.split(' ') : [];
    return { baseCmd: userInputs[0], completedCmd: userInputs }
  }

  checkLineCmd(userCommand) {
    const x1 = userCommand[1],
      y1 = userCommand[2],
      x2 = userCommand[3],
      y2 = userCommand[4];
    if ((x1 == x2) || (y1 == y2)) { //vertical (x1=x2), horizontal (y1=y2))
      return true;
    } else {
      return false;
    }
  }

  checkIfParametersAreValid(params) {
    for (var i = 1; i < params.length - 1; i++) {
      const param = params[i].replace(/\s/g, "");
      if (isNaN(param)) {
        return -1;
      } else if (param < 0) {
        return -2;
      }
    }
    return 1;
  }
}

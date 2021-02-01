import { Component } from '@angular/core';
import { UtilitiesService } from './shared/utilties';
import { commandTypes } from './shared/commandTypes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _utilitiesService: UtilitiesService) {

  }
  message = '';
  title = 'Canvas Drawing Application';
  width: number; height: number; shape: string;

  getUserCommand(event) {
    // clear the canvas first
    this.message = '';

    // break and analyse user's input
    const userInputs = this._utilitiesService.analyzUserCommand(event.target.value);
    const isValid = this._utilitiesService.checkIfParametersAreValid(userInputs.completedCmd);
    if (isValid === 1) {
      const canvasEle = this._utilitiesService.getCanvasElement();
      if (userInputs && userInputs.baseCmd) {
        if (userInputs.baseCmd === commandTypes.CREATE_NEW_CANVAS) {
          this._utilitiesService.clearTheDOM();
          if (userInputs.completedCmd.length !== 3) {
            this.message = this._utilitiesService.invalidCommandMsg('INVALID_CMD');
          } else {
            this._utilitiesService.createCanvas(userInputs.completedCmd);
          }
        } else if (userInputs.baseCmd === commandTypes.QUIT) {
          if (userInputs.completedCmd.length !== 1) {
            this.message = this._utilitiesService.invalidCommandMsg('INVALID_CMD');
          } else {
            this._utilitiesService.clearTheDOM();
            return;
          }
        }
        else if (userInputs.baseCmd.toUpperCase() === commandTypes.HELP) {
          this.message = this._utilitiesService.invalidCommandMsg('HELP');
        } else if (!canvasEle) {
          this.message = this._utilitiesService.invalidCommandMsg('CREATE_CANVAS');
        }
        else if (userInputs.baseCmd === commandTypes.DRAW_LINE) {
          if (userInputs.completedCmd.length !== 5) {
            this.message = this._utilitiesService.invalidCommandMsg('INVALID_CMD');
          } else if (this._utilitiesService.checkLineCmd(userInputs.completedCmd)) {
            this._utilitiesService.drawLine(canvasEle, userInputs.completedCmd);
          } else {
            this.message = this._utilitiesService.invalidCommandMsg('INVALID_LINE_CMD')
          }
        }
        else if (userInputs.baseCmd === commandTypes.DRAW_RECT) {
          this._utilitiesService.drawRectangle(canvasEle, userInputs.completedCmd);
        }
        else if (userInputs.baseCmd === commandTypes.BUCKET_FILL) {
          if (userInputs.completedCmd.length !== 4) {
            this.message = this._utilitiesService.invalidCommandMsg('INVALID_CMD');
          } else {
            this._utilitiesService.bucketFill(canvasEle, userInputs.completedCmd);
          }
        } else {
          this.message = this._utilitiesService.invalidCommandMsg('INVALID_CMD');
        }
      }
    } else if (isValid === -1) {
      this.message = this._utilitiesService.invalidCommandMsg('INVALID_CMD');
    } else {
      this.message = this._utilitiesService.invalidCommandMsg('INVALID_NON_NEGATIVE_CMD');
    }
  }

  clearCanvas() {
    const inputEle = <HTMLInputElement>document.getElementById('user_command');
    inputEle.value = '';
    this.message = '';
    this._utilitiesService.clearTheDOM();
  }
}

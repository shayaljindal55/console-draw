import {Component } from '@angular/core';
import { UtilitiesService } from './shared/utilties';
import { messages } from './shared/custom-messages';

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
    const userInputs = this.analyzUserCommand(event.target.value);
    const isValid = this.checkIfParametersAreValid(userInputs.completedCmd);
    if (isValid) {
      if (userInputs && userInputs.baseCmd) {
        if (userInputs.baseCmd === 'C') {
          if (userInputs.completedCmd.length !== 3) {
            this.invalidCommandMsg();
          } else {
            this._utilitiesService.createCanvas(userInputs.completedCmd);
          }
        }
        else if (userInputs.baseCmd === 'L') { }
        else if (userInputs.baseCmd === 'R') { }
        else if (userInputs.baseCmd === 'B') { }
        else if (userInputs.baseCmd === 'Q') { }
        else if (userInputs.baseCmd.toLowerCase() === 'h') {
          this.message = messages['help'];
        }
      }
    } else {
      this.invalidCommandMsg();
    }
  }

  invalidCommandMsg() {
    this.message = messages['INVALID_CMD'];
  }

  checkIfParametersAreValid(params) {
    for (var i = 1; i < params.length - 1; i++) {
      if (!this._utilitiesService.isNumeric(params[i])) {
        return false;
      }
    }
    return true;
  }

  analyzUserCommand(useInput) {
    let userInputs = useInput ? useInput.replace(/\s/g, "").split('') : [];
    return { baseCmd: userInputs[0], completedCmd: userInputs }
  }
}

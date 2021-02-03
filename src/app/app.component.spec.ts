import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UtilitiesService } from './shared/utilties';
import { messages } from './shared/custom-messages';
import { commandTypes } from './shared/commandTypes';

describe('Test Case for Canvas Drawing Application', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let _utilitiesService: UtilitiesService;
  let user_command: HTMLInputElement;
  let messageEl: HTMLSpanElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [UtilitiesService]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    user_command = <HTMLInputElement>document.getElementById('user_command');
    messageEl = <HTMLSpanElement>document.getElementById('message');
    // inject dependent service.
    _utilitiesService = TestBed.get(UtilitiesService);
    fixture.detectChanges();
  });
  function triggerCommand() {
    const event = new KeyboardEvent('keyup', {
      key: 'Enter',
    });
    user_command.dispatchEvent(event);
    fixture.detectChanges();
  }

  function createNewCanvas() {
    user_command.value = 'C 500 200';
    triggerCommand();
    fixture.detectChanges();
    const canvasEle = <HTMLCanvasElement>document.getElementById("canvas");
    expect(canvasEle.width).toBe(500);
    expect(canvasEle.height).toBe(200);
  }

  function checkIfParentDivClear() {
    const dymanicEle = document.getElementById("dymanic_elements");
    expect(dymanicEle.innerHTML).toBe('');
  }

  it('An instance of AppComponent should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Simulate and test all the commands with different valid and invalid inputs', function () {
    // test cases for create new canvas
    it('With negative input params, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'C -200 200';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_NON_NEGATIVE_CMD']);
      });
    });
    it('With invalid command, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'C -200 200 100';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_CMD']);
      });
    });
    it('With valid command, a new canvas should create with width w and heigth h', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        createNewCanvas();
      });
    });

    // test cases for drawing a line (horizontal or veritcal)
    it('With negative input params, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'L -200 200 -400 200';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_NON_NEGATIVE_CMD']);
      });
    });
    it('With invalid command that is neither horizontal or vertical, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'L 200 100 400 200';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_LINE_CMD']);
      });
    });
    it('With invalid command, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'L 200 100 400';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_CMD']);
      });
    });
    it('With valid command but no canvas element, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'L 200 100 400';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['CREATE_CANVAS']);
      });
    });
    it('With valid command, a line should draw from (x1,y1) to (x2,y2)', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        createNewCanvas();
        user_command.value = 'L 200 100 500 100';
        triggerCommand();
        fixture.detectChanges();
        const canvas = <HTMLCanvasElement>document.getElementById("canvas");
        expect(canvas.toDataURL()).toBe(_utilitiesService.getDataURL(commandTypes.DRAW_LINE));
      });
    });

    // test cases for drawing a rectangle
    it('With negative input params, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'R -200 200 -400 200';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_NON_NEGATIVE_CMD']);
      });
    });
    it('With invalid command, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'R 200 100 400';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_CMD']);
      });
    });
    it('With valid command but no canvas element, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'R 200 100 400';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['CREATE_CANVAS']);
      });
    });
    it('With valid command, a rectangle should draw with upper left corner (x1,y1) and lower right corner (x2,y2)', function () {
      createNewCanvas();
      user_command.value = 'R 200 100 500 500';
      triggerCommand();
      fixture.detectChanges();
      const canvas = <HTMLCanvasElement>document.getElementById("canvas");
      expect(canvas.toDataURL()).toBe(_utilitiesService.getDataURL(commandTypes.DRAW_RECT));
    });

    // test cases for bucket fill color
    it('With negative input params, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'B -200 400 blue';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_NON_NEGATIVE_CMD']);
      });
    });
    it('With invalid command, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'B 200 300 400 blue';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['INVALID_CMD']);
      });
    });
    it('With valid command but no canvas element, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'B 200 400 blue';
        triggerCommand();
        expect(messageEl.innerHTML).toBe(messages['CREATE_CANVAS']);
      });
    });
    it('With valid command, the entire area connected to (x,y) should fill with "colour" c', function () {
      createNewCanvas();
      user_command.value = 'B 200 400 blue';
      triggerCommand();
      fixture.detectChanges();
      const canvas = <HTMLCanvasElement>document.getElementById("canvas");
      expect(canvas.toDataURL()).toBe(_utilitiesService.getDataURL(commandTypes.BUCKET_FILL));
    });

    // test cases for quit program command
    it('With invalid command, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'Q 200 300 400';
        triggerCommand();
        fixture.detectChanges();
        expect(messageEl.innerHTML).toBe(messages['INVALID_CMD']);
      });
    });
    it('With valid command, the prgram should quit', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'Q';
        triggerCommand();
        fixture.detectChanges();
        checkIfParentDivClear();
      });
    });

    // test cases for help command
    it('With invalid command, an error message should display', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'H 200 300 400';
        triggerCommand();
        fixture.detectChanges();
        expect(messageEl.innerHTML).toBe(messages['INVALID_CMD']);
      });
    });
    it('With valid command, help command message should dispaly', function () {
      spyOn(component, 'getUserCommand').and.callFake(function () {
        user_command.value = 'H';
        triggerCommand();
        fixture.detectChanges();
        expect(messageEl.innerHTML).toBe(messages['HELP']);
      });
    });

    // test reset button
    it('should reset', function () {
      const clear_btn = <HTMLButtonElement>document.getElementById('clear_btn');
      clear_btn.click();
      fixture.detectChanges();
      expect(messageEl.innerHTML).toBe('');
      expect(user_command.value).toBe('');
      checkIfParentDivClear();
    });

  });
});

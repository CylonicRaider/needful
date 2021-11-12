import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { TheneedfulService, TheneedfulCallback } from './theneedful.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let serviceMock: { doTheNeedful: any };
  let snackbarMock: { open: any };

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('TheneedfulService', ['doTheNeedful']);
    snackbarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: TheneedfulService, useValue: serviceMock },
        { provide: MatSnackBar, useValue: snackbarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have the right title', () => {
    expect(fixture.componentInstance.title).toEqual('The Pinnacle of UI');
  });

  it('should render the button', () => {
    fixture.detectChanges();
    const dom = fixture.nativeElement as HTMLElement;
    expect(dom.querySelector('button')?.textContent).toContain(
      'Do the needful',
    );
  });

  describe('after button press', () => {
    let dom: HTMLElement;

    beforeEach(() => {
      fixture.detectChanges();
      dom = fixture.nativeElement as HTMLElement;
    });

    function hookDTNAndClick(cb: (arg: any) => void) {
      serviceMock.doTheNeedful.and.callFake(cb);
      dom.querySelector('button')?.click();
    }

    it('should react', () => {
      dom.querySelector('button')?.click();
      expect(serviceMock.doTheNeedful).toHaveBeenCalled();
    });

    it('should pass a callback', () => {
      hookDTNAndClick(arg => {
        expect(arg).toBeInstanceOf(Function);
      });
    });

    it('should display a notification', () => {
      hookDTNAndClick(arg => arg(true));
      expect(snackbarMock.open).toHaveBeenCalled();
    });

    it('should indicate success correctly', () => {
      snackbarMock.open.and.callFake(
        (message: string, action: string, options: any) => {
          expect(message).toBe('Done');
        },
      );
      hookDTNAndClick(arg => arg(true));
    });

    it('should indicate failure correctly', () => {
      snackbarMock.open.and.callFake(
        (message: string, action: string, options: any) => {
          expect(message).toBe('Error');
        },
      );
      hookDTNAndClick(arg => arg(false));
    });
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { TheneedfulService, TheneedfulCallback } from './theneedful.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let serviceMock: {
    doTheNeedful: jasmine.Spy<(cb?: TheneedfulCallback | null) => void>;
  };
  let snackbarMock: {
    open: jasmine.Spy<
      (message: string, action: string, options: unknown) => void
    >;
  };

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('TheneedfulService', [
      'doTheNeedful',
    ]) as typeof serviceMock;
    snackbarMock = jasmine.createSpyObj('MatSnackBar', [
      'open',
    ]) as typeof snackbarMock;

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

    function hookDTNAndClick(cb: (arg?: TheneedfulCallback | null) => void) {
      serviceMock.doTheNeedful.and.callFake(cb);
      dom.querySelector('button')?.click();
    }

    function dtnFixedHook(result: boolean) {
      return (arg?: TheneedfulCallback | null) => {
        expect(arg).toBeTruthy();
        (arg as TheneedfulCallback)(result);
      };
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
      hookDTNAndClick(dtnFixedHook(true));
      expect(snackbarMock.open).toHaveBeenCalled();
    });

    it('should indicate success correctly', () => {
      snackbarMock.open.and.callFake(
        (message: string, action: string, options: unknown) => {
          expect(message).toBe('Done');
        },
      );
      hookDTNAndClick(dtnFixedHook(true));
    });

    it('should indicate failure correctly', () => {
      snackbarMock.open.and.callFake(
        (message: string, action: string, options: unknown) => {
          expect(message).toBe('Error');
        },
      );
      hookDTNAndClick(dtnFixedHook(false));
    });
  });
});

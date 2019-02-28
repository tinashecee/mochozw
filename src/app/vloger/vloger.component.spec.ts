import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VlogerComponent } from './vloger.component';

describe('VlogerComponent', () => {
  let component: VlogerComponent;
  let fixture: ComponentFixture<VlogerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VlogerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlogerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowreelComponent } from './showreel.component';

describe('ShowreelComponent', () => {
  let component: ShowreelComponent;
  let fixture: ComponentFixture<ShowreelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowreelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowreelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

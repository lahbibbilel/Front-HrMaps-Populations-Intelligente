import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePopulationBodyComponent } from './update-population-body.component';

describe('UpdatePopulationBodyComponent', () => {
  let component: UpdatePopulationBodyComponent;
  let fixture: ComponentFixture<UpdatePopulationBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePopulationBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePopulationBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

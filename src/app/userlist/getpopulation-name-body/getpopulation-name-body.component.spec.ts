import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetpopulationNameBodyComponent } from './getpopulation-name-body.component';

describe('GetpopulationNameBodyComponent', () => {
  let component: GetpopulationNameBodyComponent;
  let fixture: ComponentFixture<GetpopulationNameBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetpopulationNameBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetpopulationNameBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

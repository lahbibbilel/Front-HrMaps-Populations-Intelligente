import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationsComponent } from './populations.component';

describe('PopulationsComponent', () => {
  let component: PopulationsComponent;
  let fixture: ComponentFixture<PopulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePopulationBodyComponent } from './delete-population-body.component';

describe('DeletePopulationBodyComponent', () => {
  let component: DeletePopulationBodyComponent;
  let fixture: ComponentFixture<DeletePopulationBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePopulationBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePopulationBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

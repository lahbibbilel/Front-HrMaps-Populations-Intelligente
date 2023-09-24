import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollabBodyComponent } from './update-collab-body.component';

describe('UpdateCollabBodyComponent', () => {
  let component: UpdateCollabBodyComponent;
  let fixture: ComponentFixture<UpdateCollabBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCollabBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCollabBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

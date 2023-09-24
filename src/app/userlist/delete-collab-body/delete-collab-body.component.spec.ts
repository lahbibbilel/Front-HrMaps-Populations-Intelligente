import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollabBodyComponent } from './delete-collab-body.component';

describe('DeleteCollabBodyComponent', () => {
  let component: DeleteCollabBodyComponent;
  let fixture: ComponentFixture<DeleteCollabBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCollabBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCollabBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

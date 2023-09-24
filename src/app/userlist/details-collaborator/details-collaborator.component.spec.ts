import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCollaboratorComponent } from './details-collaborator.component';

describe('DetailsCollaboratorComponent', () => {
  let component: DetailsCollaboratorComponent;
  let fixture: ComponentFixture<DetailsCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCollaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

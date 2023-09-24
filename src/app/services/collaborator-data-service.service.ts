import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Populations} from "../interfaces/populations";
import {Collaborators} from "../interfaces/Collaborators";

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataServiceService {

  constructor() { }


  getNewPopulationSubject() {
    return this.newCollaboratorSubject;
  }


  private newCollaboratorSubject = new Subject<Collaborators>();

  emitNewCollaborator(newCollaborator: Collaborators) {
    this.newCollaboratorSubject.next(newCollaborator);
  }

}

import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Populations} from "../interfaces/populations";

@Injectable({
  providedIn: 'root'
})
export class PopulationDataServiceService {

  constructor() { }
  private newPopulationSubject = new Subject<Populations>();

  getNewPopulationSubject() {
    return this.newPopulationSubject;
  }

  emitNewPopulation(newPopulation: Populations) {
    this.newPopulationSubject.next(newPopulation);
  }
}

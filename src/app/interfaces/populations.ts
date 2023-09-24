import {Collaborators} from "./Collaborators";

export interface Populations {
  id: number;
  populationName: string;
  contratType: string;
  dureeTravail: string;
  dateDebutContrat: Date;
  dateFinContrat: Date;
  anciennete: number;
  categorieSocioProfessionnelle: string;
  departement: string;
  genre: string;
  age: number;
  niveauEducation: string;
  regionGeographique: string;
  collaborator: Collaborators[];
  populationCount: number;

}


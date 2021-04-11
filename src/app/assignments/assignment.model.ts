import { Eleve } from "./eleve.model";
import { Matiere } from "./matiere.model";

export class Assignment {
    _id?:string;
    id:number;
    dateDeRendu:Date;
    rendu:boolean;
    eleve: Eleve;
    matiere: Matiere;
    note: number;
    remarque: string;
  }
  
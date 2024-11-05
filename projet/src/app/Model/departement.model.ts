import { College } from "./college.model";
import { Image } from "./image";

export class Departement {
    idDepartement? : number;
    nomDepartement? : string;
    nombreEmployee? : number;
     dateAffectation? : Date ;
     college?: College ; 
     images!: Image[];
     imageStr!:string

    }
    
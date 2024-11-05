import { Component, Input, OnInit } from '@angular/core';
import { College } from '../app/Model/college.model';
import { DepartementService } from '../app/Service/departement.service';

@Component({
  selector: 'app-liste-college',
  templateUrl: './liste-college.component.html',
  styles: ``
})
export class ListeCollegeComponent implements OnInit {
  colleges!: any;


  ajout:boolean=true;


  updatedCol:College = {"idcol":0,"nomcol":""};

  constructor(private departementServices: DepartementService) { }


  ngOnInit(): void {

    this.chargerCollege();
 
}


collegeUpdated(col:College){
  console.log("col updated event",col);
  this.departementServices.ajouterCollege(col).
   subscribe( ()=> this.chargerCollege());
  }


chargerCollege() {
  this.departementServices.listCollege(). subscribe(col => {this.colleges = col;
    console.log(col);
    });

}





updateCol(col:College) {
  this.updatedCol=col;
  this.ajout=false;
  }


// collegeUpdate(col :College) {
//   console.log("catégorie reçue du composant updateCAtegorie ",col);
//   this.departementServices.ajouterDepartement(col).subscribe( ()=> this.chargerCollege());


// }

// updateCol(col :College)
// {
//   this.updateCol = col;
//   this.ajout=false;
// }
}
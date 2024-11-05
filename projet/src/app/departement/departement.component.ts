import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../Service/departement.service';
import { Departement } from '../Model/departement.model';
import { AuthService } from '../Service/auth.service';
import { Image } from '../Model/image';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.css'
})
export class DepartementComponent implements OnInit {

  departements!: Departement[]; //un tableau de chînes de caractères

  constructor(private departementServices: DepartementService , public authService: AuthService ) {
    // this.departements = departementServices.listeDepartements();
  }







  ngOnInit(): void {
    this.chargeDepartements();
  }

  chargeDepartements() {
    this.departementServices.listeDepartements().subscribe(depar => {
     
      this.departements = depar;
      this.departements.forEach((depar) => {
        depar.imageStr = 'data:' + depar.images[0].type + ';base64,' +  depar.images[0].image;
      
      });
    });
  }


  supprimerDepartement(d: Departement) {
    console.log("slmsssss")
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.departementServices.supprimerDepartement(d.idDepartement!).subscribe(() => {
        console.log("departement supprimé");
        this.chargeDepartements();
      });
  }

}

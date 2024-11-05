import { Component, OnInit } from '@angular/core';
import { Departement } from '../Model/departement.model';
import { DepartementService } from '../Service/departement.service';
import { College } from '../Model/college.model';
import { Router } from '@angular/router';
import { Image } from '../Model/image';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrl: './add-departement.component.css'
})
export class AddDepartementComponent implements OnInit {

  newDepartement = new Departement()
  newCollege?: College;
  newIdCol!: number;
  colleges !: College[];
  uploadedImage!: File;
  imagePath: any;

  constructor(private departementService: DepartementService, private router: Router) { }

  ngOnInit(): void {
    this.departementService.listCollege()
      .subscribe(response => {
        console.log('Response from listCollege:', response);
        if (response && Array.isArray(response)) {
          this.colleges = response;
          console.log('Colleges:', this.colleges);
        } else {
          console.error('No colleges found in response');
        }
      }, error => {
        console.error('Error fetching colleges:', error);
      });
  }




  addDepartement() {
    // Téléverse l'image
    this.departementService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        // Associe l'image au nouveau département
        this.newDepartement.image = img;
  
        // Associe le collège au nouveau département
        this.newDepartement.college = this.colleges.find(cat => cat.idcol == this.newIdCol)!;
  
        // Ajoute le département
        this.departementService.ajouterDepartement(this.newDepartement)
          .subscribe(prod => {
            console.log(prod);
            // Redirige vers la page des départements
            this.router.navigate(['departement']);
          });
      });
  }
  


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }



}

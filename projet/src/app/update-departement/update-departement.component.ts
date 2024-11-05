import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from '../Service/departement.service';
import { Departement } from '../Model/departement.model';
import { College } from '../Model/college.model';
import { Image } from '../Model/image';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styles: []
})
export class UpdateDepartementComponent {

  colleges!: College[];
  updateColId !: number | undefined;
  currentDepartement = new Departement();
  listDepartement: any;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  idImage: Image = new Image();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private departementService: DepartementService) { }

  // ngOnInit(): void {
  //   this.departementService.listCollege().subscribe(cats => {
  //     console.log(cats); // Log the response to inspect its structure
  //     if (Array.isArray(cats)) {
  //       this.colleges = cats;
  //     } else {
  //       console.error('Unexpected response structure:', cats);
  //       this.colleges = []; // Initialize to an empty array to avoid further errors
  //     }
  //   });

  //   this.departementService.consulterDepartement(this.activatedRoute.snapshot.params['id']).subscribe(prod => {
  //     if (prod) {
  //       this.currentDepartement = prod;
  //       this.updateColId = this.currentDepartement.college?.idcol;
  //     } else {
  //       console.error('Unexpected response structure:', prod);
  //     }
  //   });



  ngOnInit(): void {
    this.departementService.listCollege().subscribe(cats => {
      console.log(cats); // Log the response to inspect its structure
      if (Array.isArray(cats)) {
        this.colleges = cats;
      } else {
        console.error('Unexpected response structure:', cats);
        this.colleges = []; // Initialize to an empty array to avoid further errors
      }
    });

    this.departementService.consulterDepartement(this.activatedRoute.snapshot.params['id'])
    .subscribe( prod =>{ this.currentDepartement = prod;
    this.updateColId = prod.college?.idcol;
    } ) ;
    }








  updateDepartement() {
    this.currentDepartement.college = this.colleges.find(cat => cat.idcol == this.updateColId)!;
    this.departementService.updateDepartement(this.currentDepartement).subscribe(prod => {
      this.router.navigate(['departement']);
    }
    );
  }

  // updateDepartement() {
  //   this.currentDepartement.college = this.colleges.find(cat => cat.idcol ==
  //     this.updateColId)!;
  //   //tester si l'image du produit a été modifiée
  //   if (this.isImageUpdated) {
  //     this.departementService
  //       .uploadImage(this.uploadedImage, this.uploadedImage.name)
  //       .subscribe((img: Image) => {
  //         this.currentDepartement.image = img;
  //         this.departementService
  //           .updateDepartement(this.currentDepartement)
  //           .subscribe((prod) => {
  //             this.router.navigate(['departement']);
  //           });
  //       });
  //   }
  //   else {
  //     this.departementService
  //       .updateDepartement(this.currentDepartement)
  //       .subscribe((prod) => {
  //         this.router.navigate(['departement']);
  //       });
  //   }
  // }



  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageDepartement() {
    this.departementService
    .uploadImageDepar(this.uploadedImage,
    this.uploadedImage.name,this.currentDepartement.idDepartement)
    .subscribe( (img : Image) => {
    this.currentDepartement.images.push(img);
    });
    }


    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.departementService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images
      const index = this.currentDepartement.images.indexOf(img, 0);
      if (index > -1) {
      this.currentDepartement.images.splice(index, 1);
      }
      });
      }








}



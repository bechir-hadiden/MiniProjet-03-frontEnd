import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Model/user';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  public user = new User();
  err!:any;

  confirmPassword?: string;
  myForm!: FormGroup;

loading : boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService , private router: Router , private toastr: ToastrService) { }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
    username : ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword : ['', [Validators.required]]
    } );
    }
    onRegister() {
      this.loading=true;
      this.authService.registerUser(this.user).subscribe({
        next: (res) => {
          this. authService.setRegistredUser(this.user);
          // alert("veillez confirmer votre email");
          this.loading=false;
          this.toastr.success('veillez confirmer votre email', 'Confirmation');

          this.router.navigate(["/verifEmail"]);
          
        },
        error: (err: any) => {
          console.error("Erreur complète :", err); // Affiche l'erreur dans la console pour inspection
          if (err.status === 400 && err.error && err.error.message) {
            this.err = err.error.message;
          } else if (err.error && typeof err.error === 'string') {
            // Si l'erreur est un message sous forme de chaîne
            this.err = err.error;
          } else {
            this.err = "Une erreur est survenue. Veuillez réessayer.";
          }
        }
      });
    }
    
    
}

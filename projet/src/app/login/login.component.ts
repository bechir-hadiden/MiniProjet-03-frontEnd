import { Component } from '@angular/core';
import { User } from '../Model/user';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }


  user = new User();
  message : string =""
  erreur: number= 0;
  err : number = 0;

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        if (token) {
          this.authService.saveToken(token);
          this.router.navigate(['/departement']);
          console.log("slm");
        }
      },
      error: (error) => {
        console.log(error); // Ajoutez cette ligne pour inspecter l'objet d'erreur
        this.err = 1;
        if (error.error && error.error.errorCause === 'disabled') {
          this.message = "Utilisateur désactivé, Veuillez contacter votre Administrateur";
        } else {
          this.message = "login ou mot passe erronés";
        }
      }
    });
  }
  


    saveToken(token: string): void {
      localStorage.setItem('jwtToken', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('jwtToken');
    }

  }

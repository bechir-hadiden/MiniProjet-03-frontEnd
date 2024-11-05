import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/user';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css'
})
export class VerifEmailComponent implements OnInit {

  code: string = "";
  user: User = new User();
  err = "";
  constructor(private route: ActivatedRoute, private authService: AuthService,private router: Router) { }
  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }
  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      error: (err: any) => {
        if (err.status === 400) { // Correction de l'assignation à comparaison
          this.err = err.error.message;
        } else if (err.error === 'TokenExpired') {
          // Gérer le rafraîchissement ici si le backend le prend en charge
          console.log("Token has expired, please refresh or re-authenticate.");
        }
        console.log(err);
      }
    });
  }
  
}


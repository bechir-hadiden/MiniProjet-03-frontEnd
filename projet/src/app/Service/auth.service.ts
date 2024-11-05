import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  private helper = new JwtHelperService();
  public regitredUser: User = new User();

  token!: string;


  apiUser: string = "http://localhost:8095/users";


  constructor(private router: Router, private http: HttpClient) { }




  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }



  login(user: User) {
    return this.http.post<User>(this.apiUser + '/login', user, { observe: 'response' });

  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
    console.log(jwt )

  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }



  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    // this.getUserRoles(login);
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }



  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }


  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }


  registerUser(user: User) {



    // const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké ici
    // const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<User>(this.apiUser + '/register', user, { observe: 'response' });
  }


  validateEmail(code: string) {
    return this.http.get<User>(this.apiUser + '/verifyEmail/' + code);
  }



}

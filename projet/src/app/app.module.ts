import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartementComponent } from './departement/departement.component';
import { AddDepartementComponent } from './add-departement/add-departement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateDepartementComponent } from './update-departement/update-departement.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RechercheParCollegeComponent } from './recherche-par-college/recherche-par-college.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from '../search-filter.pipe';
import { ListeCollegeComponent } from '../liste-college/liste-college.component';
import { UpdateCollegeComponent } from '../update-college/update-college.component';
import { CollegeWrapper } from './Model/collegeWarped';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; // Importez ToastrModule


@NgModule({
  declarations: [
    AppComponent,
    DepartementComponent,
    AddDepartementComponent,
    UpdateDepartementComponent,
    RechercheParCollegeComponent,
    RechercheParNomComponent,
    SearchFilterPipe ,
    ListeCollegeComponent,
    UpdateCollegeComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    VerifEmailComponent, 
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 


    // RouterModule.forRoot(routes)
  ],
  providers: [{ provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor,multi : true}
     ],
    
  bootstrap: [AppComponent],
  exports: [RouterModule]

})
export class AppModule { }

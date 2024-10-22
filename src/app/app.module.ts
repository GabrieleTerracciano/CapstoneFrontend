import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlaystationComponent } from './components/playstation/playstation.component';
import { XboxComponent } from './components/xbox/xbox.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './service/cart.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CategorieComponent } from './components/categorie/categorie.component';

const routes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'categorie',
    component: CategorieComponent,
  },
  {
    path: 'playstation',
    component: PlaystationComponent,
  },
  {
    path: 'xbox',
    component: XboxComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CategorieComponent,
    PlaystationComponent,
    XboxComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    CartComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    },
    CartService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

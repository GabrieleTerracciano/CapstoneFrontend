import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private authSrv: AuthService, private router: Router) {}

    login(form: NgForm) {
        console.log(form.value);
        this.authSrv.login(form.value).subscribe(
            () => {
                alert('Login avvenuto con successo!');
                this.router.navigate(['/categorie']);
            },
            (error) => {
                console.error('Errore di autenticazione:', error);
                alert('Credenziali errate. Riprova.');
            }
        );
    }
}

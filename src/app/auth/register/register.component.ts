import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(private authSrv: AuthService, private router: Router) {}

    onSubmit(form: NgForm) {
        console.log(form.value);
        this.authSrv.signup(form.value).subscribe(
            () => {
                alert('Registrazione avvenuta con successo! Ora puoi effettuare il login.');
                this.router.navigate(['/login']);
            },
            (error) => {
                console.error('Errore durante la registrazione:', error);
                alert('Errore durante la registrazione. Riprova.');
            }
        );
    }
}

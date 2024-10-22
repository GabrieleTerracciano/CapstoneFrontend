import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserFromToken(token).subscribe(
        (data: User) => {
          this.user = data;
        },
        (error) => {
          console.error('Errore durante il recupero del profilo utente', error);
          this.errorMessage = error.message ? error.message : 'Impossibile recuperare il profilo utente';
        }
      );
    } else {
      this.errorMessage = 'L\'utente non è connesso';
    }
  }
  
}

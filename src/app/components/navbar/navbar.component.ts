import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VideogameService } from 'src/app/service/videogame.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;

  constructor(
    private router: Router,
    private videogameService: VideogameService
  ) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.videogameService.getVideogamesByName(this.searchTerm).subscribe(videogames => {
        this.searchResults = videogames;
        this.showResults = this.searchResults.length > 0;
      }, error => {
        console.error('Errore nella ricerca del videogioco:', error);
        alert('Si è verificato un errore durante la ricerca.');
      });
    } else {
      this.clearResults();
    }
  }

  selectVideogame(videogame: any): void {
    this.router.navigate(['/details', videogame.id]);
    this.clearResults();
  }

  clearResults(): void {
    this.searchResults = [];
    this.showResults = false;
    this.searchTerm = '';
  }
}

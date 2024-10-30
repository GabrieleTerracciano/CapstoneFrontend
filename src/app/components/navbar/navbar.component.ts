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

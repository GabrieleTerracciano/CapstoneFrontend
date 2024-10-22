import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/service/genre.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categorie: any[] = [];
  selectedCategory: any;

  constructor(private genreService: GenreService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.genreService.getAllGenres().subscribe(
      (response: any) => {
        this.categorie = response.results;
      },
      (error) => {
        console.error('Errore durante il recupero delle categorie:', error);
      }
    );
  }

  onCategorySelect(category: any) {
    this.selectedCategory = category;
  }
}

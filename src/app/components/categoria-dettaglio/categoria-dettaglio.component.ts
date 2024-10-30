import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-categoria-dettaglio',
  templateUrl: './categoria-dettaglio.component.html',
  styleUrls: ['./categoria-dettaglio.component.scss']
})
export class CategoriaDettaglioComponent implements OnInit {
  categoria: any;
  giochi: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    if (id) {
      this.genreService.getGenreById(id).subscribe(
        (data: any) => {
          this.categoria = data;
        },
        (error) => {
          console.error('Errore nel recupero dei dettagli della categoria:', error);
        }
      );
      this.genreService.getGamesByGenre(id, 100).subscribe(
        (response: any) => {
          this.giochi = response.results;
        },
        (error) => {
          console.error('Errore nel recupero dei giochi della categoria:', error);
        }
      );
    }
  }
}

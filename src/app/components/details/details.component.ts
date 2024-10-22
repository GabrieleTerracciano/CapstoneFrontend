import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Videogame } from 'src/app/models/videogame.interface';
import { VideogameService } from 'src/app/service/videogame.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  videogame!: Videogame;
  quantity: number = 1;
  price: number = 0;

  constructor(
    private route: ActivatedRoute,
    private videogameService: VideogameService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = +idParam;
      this.videogameService.getVideogameById(id).subscribe(data => {
        this.videogame = data; 
        this.price = this.generateRandomPrice();
      }, error => {
        console.error('Errore nel recupero del videogioco:', error);
      });
    } else {
      console.error('ID non presente nella route');
    }
  }

  generateRandomPrice(): number {
    return Math.floor(Math.random() * 60) + 10;
  }

  addToCart(game: Videogame, quantity: number): void {
    if (quantity > 0) {
      this.cartService.addProductToCart({ ...game, price: this.price }, quantity);
      alert(`${quantity} unità di "${game.name}" aggiunte al carrello!`);
    }
  }
}

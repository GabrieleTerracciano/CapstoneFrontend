import { Component, OnInit } from '@angular/core';
import { VideogameService } from 'src/app/service/videogame.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-playstation',
  templateUrl: './playstation.component.html',
  styleUrls: ['./playstation.component.scss']
})
export class PlaystationComponent implements OnInit {
  games: any[] = [];
  quantity: { [key: number]: number } = {};

  constructor(private videogameService: VideogameService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getPlaystationGames();
  }

  getPlaystationGames() {
    this.videogameService.getAllVideogames().subscribe(
      (response: any) => {
        this.games = response;
        this.games.forEach(game => {
          if (!game.price) {
            game.price = this.generateRandomPrice();
          }
        });
      },
      (error) => {
        console.error('Errore durante il recupero dei giochi Playstation:', error);
      }
    );
  }

  generateRandomPrice(): number {
    return Math.floor(Math.random() * 60) + 10;
  }

  addToCart(game: any, quantity: number) {
    if (quantity > 0) {
      this.cartService.addProductToCart(game, quantity);
      this.quantity[game.id] = 1;
    }
  }
}

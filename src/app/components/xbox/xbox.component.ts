import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { VideogameService } from 'src/app/service/videogame.service';

@Component({
  selector: 'app-xbox',
  templateUrl: './xbox.component.html',
  styleUrls: ['./xbox.component.scss']
})
export class XboxComponent implements OnInit {
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

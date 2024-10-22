import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: any; quantity: number }[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeProductFromCart(productId);
    this.loadCartItems();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(productId);
    } else {
      this.cartService.updateProductQuantity(productId, quantity);
      this.calculateTotal();
    }
  }

  async checkout(): Promise<void> {
    if (this.cartItems.length === 0) {
      alert('Il carrello è vuoto. Aggiungi prodotti per procedere al checkout.');
      return;
    }

    this.cartService.createCheckoutSession().subscribe(
      async (session) => {
        // Carica Stripe.js
        const stripe = await loadStripe('pk_test_51QCKq1Kox4xzQwbE7OGE3bdIGwR9yyAatdZDZJQGZto9JU9iAGzzwJbAub9bNQK7ss2VNWycY3o9JfCThjAyx6ie00v6I3hrrc');

        if (!stripe) {
          console.error('Errore durante il caricamento di Stripe.');
          return;
        }

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error('Errore durante il reindirizzamento a Stripe:', result.error.message);
          alert('Si è verificato un errore durante il reindirizzamento a Stripe: ' + result.error.message);
        }
      },
      (error) => {
        console.error('Errore durante la creazione della sessione di checkout:', error);
        alert('Si è verificato un errore durante la creazione della sessione di checkout.');
      }
    );
  }
}

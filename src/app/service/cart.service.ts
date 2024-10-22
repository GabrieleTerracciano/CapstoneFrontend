import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { product: any; quantity: number }[] = [];
  private apiUrl = 'http://localhost:8080/api/stripe';

  constructor(private http: HttpClient) {}

  addProductToCart(product: any, quantity: number) {
    const cartItem = { product, quantity };
    const existingProduct = this.cart.find(item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push(cartItem);
    }

    console.log('Prodotto aggiunto al carrello:', this.cart);
  }

  getCartItems() {
    return this.cart;
  }

  removeProductFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }

  updateProductQuantity(productId: number, quantity: number) {
    const existingProduct = this.cart.find(item => item.product.id === productId);
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }
  }

  createCheckoutSession() {
    const cartItemsForStripe = this.cart.map(item => ({
      productName: item.product.name,
      productPrice: item.product.price,
      quantity: item.quantity,
    }));

    return this.http.post<{ id: string }>(`${this.apiUrl}/create-checkout-session`, cartItemsForStripe);
  }
}

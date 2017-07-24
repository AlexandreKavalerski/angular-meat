import { Injectable } from '@angular/core'

import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'
import { Order, OrderItem } from './order.model'
import { MEAT_API } from '../app.api'

@Injectable()
export class OrderService{

  headers: Headers = new Headers()
  options: RequestOptions
  constructor(private cartService: ShoppingCartService,
    private http: Http){
      this.headers.append('Content-Type', 'application/json')
      this.options = new RequestOptions({headers: this.headers})
  }

  itemsValue(): number{
    return this.cartService.total()
  }

  cartItems(): CartItem[]{
    return this.cartService.items
  }

  increaseQty(item: CartItem): void{
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem): void{
    this.cartService.decreaseQty(item);
  }

  clear(): void{
    this.cartService.clear()
  }

  remove(item: CartItem): void{
    this.cartService.removeItem(item);
  }

  checkOrder(order: Order): Observable<string>{
    return this.http.post(`${MEAT_API}/orders`,
      JSON.stringify(order),
      this.options)
      .map(response => response.json())
      .map(order => order.id)
  }

}

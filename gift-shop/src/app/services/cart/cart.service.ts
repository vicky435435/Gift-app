import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private _cart = new BehaviorSubject<any>(null);

  get cart() {
    return this._cart.asObservable();
  }
  constructor() { }

  addQuantity(item: any){
    //this._cart.next(this._cart.value + 1);
    const data = this._cart.value;
    const totalItems = (data?.totalItems || 0) + 1;
    this._cart.next({totalItems});

  }


}

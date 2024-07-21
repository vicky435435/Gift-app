import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Strings } from 'src/app/enum/strings.enum';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  model : any = null;
  total_delivery_charge = 100;
  private _cart = new BehaviorSubject<any>(null);
  cartStoreName = Strings.CART_STORAGE
  currency = Strings.CURRENCY;
  private storage = inject(StorageService)

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
  
  // Time as 14 : pause time
  

}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonButton, IonIcon, IonCard, IonImg, IonThumbnail, IonText, IonCol, IonRow, IonList, IonListHeader, IonItemGroup, IonFooter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonFooter, IonItemGroup, IonListHeader, IonList, IonRow, IonCol, IonText, IonImg, IonCard, IonIcon, IonButton, IonLabel, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonThumbnail, DecimalPipe ]
})
export class CartPage implements OnInit , OnDestroy{
  private router = inject(Router);
  previous! : string ;
  cartSub! : Subscription;
  public cartService = inject(CartService)
  model: any = null;
  //model: any = null;
  //total_delivery_charge = 100;
  // _cart = new BehaviorSubject<any>(null);
  constructor() { }


 

  ngOnInit() {
    this.checkUrl()

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.model = cart
      }
    })

  }

  checkUrl(){
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop()
    this.previous = urlParts.join('/');
    console.log('url', this.previous)
  }

  addQuantity(item: any) {
    this.cartService.addQuantity(item);
  }

  subtractQuantity(item: any) {
    this.cartService.subtractQuantity(item);
  }


  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe(); {
      
    }
  }



}

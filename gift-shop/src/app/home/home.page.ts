import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonThumbnail, IonImg, IonCard, IonLabel, IonText, IonIcon, IonSearchbar, IonButtons, IonBadge, IonButton } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { cart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonBadge, IonButtons, IonSearchbar, IonIcon, IonText, IonLabel, IonCard, IonImg, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail,RouterLink],
})
export class HomePage implements OnInit, OnDestroy{
  constructor() {}


  
  ngOnInit() {
    console.log('working llll')
   this.getItems() 

   this.cartSub = this.cartService.cart.subscribe({
    next : (cart) =>{
      this.totalItems = cart ? cart?.totalItems :0;
    }
   })
  }

 
  items : any[] = [];
  allItems: any[] = [];
  query!: string;
  totalItems = 0;
  cartSub!: Subscription;
  private api = inject(ApiService)
  private cartService = inject(CartService)
  getItems(){
    this.allItems = this.api.gifts;
    this.items = [...this.allItems];
  }
  
  
  getGifts(event : any) {
    this.query = event.detail.value.toLowerCase();
    this.querySearch();
  }

  querySearch() {
    this.items = [];
    if (this.query.length > 0) {
      this.searchItems();
    } else {
      this.items = [...this.allItems];
    }
  }

  searchItems() {
    this.items = this.api.gifts.filter((gifts) =>
      gifts.name.toLowerCase().includes(this.query)
    );
  }

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
}

}

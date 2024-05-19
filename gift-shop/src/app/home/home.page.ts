import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonThumbnail, IonImg, IonCard, IonLabel, IonText, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonIcon, IonText, IonLabel, IonCard, IonImg, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail],
})
export class HomePage {
  constructor() {}
  
  ngOnInit() {
    console.log('working llll')
   this.getItems() 
  }

  items : any[] = [];
  allItems: any[] = [];
  query!: string;
  totalItems = 0;
  cartSub!: Subscription;
  private api = inject(ApiService)

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


}

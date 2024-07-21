import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonItem, IonLabel, IonText, IonFooter, IonButton, IonBadge } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular/standalone'
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
  standalone: true,
  imports: [IonBadge, IonButton, IonFooter, IonText, IonLabel, IonItem, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class ItemDetailsPage implements OnInit, OnDestroy{
  id!: string;
  item :any;
  addToBag! :any;
  totalItems = 1;
  cartSub! : Subscription
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController)
  private api = inject(ApiService);
  private cartService = inject(CartService)

  constructor() { }


  ngOnInit() {

  this.getItem();

  this.cartSub = this.cartService.cart.subscribe({
    next : (cart) =>{
      this.totalItems = cart ? cart?.totalItems :0;
    }
   })
  }
  
  getItem(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("item", id)
    if(!id || id == '0'){
      this.navCtrl.back()
      return;
    }

    this.id = id;

    this.item = this.api.gifts.find((record) => record.id == id);
    console.log(this.item)

  }

  addItem(){
    const result  = this.cartService.addQuantity(this.item)
    this.addedText();
  }

  addedText (){
    this.addToBag = "Added to Bag";
    setTimeout(() => {
      this.addToBag = null;
    }, 1000
   );
  }
  

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
}

}

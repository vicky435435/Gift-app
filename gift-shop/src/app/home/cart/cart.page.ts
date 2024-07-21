import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CartPage implements OnInit {
  private router = inject(Router);
  previous! : string ;
  //model: any = null;
  //total_delivery_charge = 100;
  // _cart = new BehaviorSubject<any>(null);
  constructor() { }

  ngOnInit() {
    this.checkUrl()
  }

  checkUrl(){
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop()
    this.previous = urlParts.join('/');
    console.log('url', this.previous)
  }

}

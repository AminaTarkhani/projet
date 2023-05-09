import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-fast-box',
  templateUrl: './fast-box.page.html',
  styleUrls: ['./fast-box.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FastBoxPage implements OnInit {

  selectedSubscription: any;
  serialNumber: any;
  selectedDebit: any;
  isSemestrielle: boolean = false;
  isMensuelle: boolean = false;
  isAnnuelle: boolean = false;


  subscriptions = [
    'Fast Box 1P/2P : annuelle/semestrielle',
    'Fast Box Jdid / Fast+ Box : mensuelle'
  ];

  debits = [
    '8G',
    '12G'
  ];

  constructor() { }

  ngOnInit() {
  }




  selectedAbonnement() {
    }
  Verifier(){}


  }

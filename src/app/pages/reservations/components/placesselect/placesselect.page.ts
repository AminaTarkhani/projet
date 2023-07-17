import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-placesselect',
  templateUrl: './placesselect.page.html',
  styleUrls: ['./placesselect.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlacesselectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

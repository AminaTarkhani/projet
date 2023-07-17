import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modalmap',
  templateUrl: './modalmap.page.html',
  styleUrls: ['./modalmap.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalmapPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

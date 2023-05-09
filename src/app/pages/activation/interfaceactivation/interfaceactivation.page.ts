import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-interfaceactivation',
  templateUrl: './interfaceactivation.page.html',
  styleUrls: ['./interfaceactivation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InterfaceactivationPage implements OnInit {
  selectedNationalite: any;
  otherNationalite: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  isFirstColumn = true;

  currentNationalite = undefined;

  nationalites = [
    {
      id: 1,
      name: 'Tunisien',
      type: 'nationalite',
    },


  ];

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentNationalite = ev.target.value;
  }
  Valider(){
    this.router.navigateByUrl('/offres');

  }
}



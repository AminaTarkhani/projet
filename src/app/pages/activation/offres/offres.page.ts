import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-offres',
  templateUrl: './offres.page.html',
  styleUrls: ['./offres.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OffresPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onClickFIXEJDIDBOX(){}
  onClickFLASHBOX(){}
  onClickSUPERBOX(){
    this.router.navigateByUrl('/super-box');

  }
  onClickFBOX(){}
  onClickFASTBOX(){
    this.router.navigateByUrl('/fast-box');
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-interfaceactivation',
  templateUrl: './interfaceactivation.page.html',
  styleUrls: ['./interfaceactivation.page.scss'],
  standalone: true,
  imports: [IonicModule,
     CommonModule,
     FormsModule,
     ReactiveFormsModule]
})

export class InterfaceactivationPage implements OnInit {
  selectedNationalite: any;
  otherNationalite: any;
  prospector: FormGroup ;

  place: 'CIN' | 'PASS' | 'SEJ' = 'CIN';


  constructor(private router: Router,private http:HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,


    ) {
      this.prospector = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['' ,Validators.required],
        adresse: ['', Validators.required],
        numeroidentite: ['', [Validators.required, Validators.maxLength(10)]],
       numContact: ['',[Validators.required, Validators.maxLength(8)]],
        naissance: ['', Validators.required],
        gouvernorat : ['', Validators.required],
        localite: ['', Validators.required],
        codepostale: ['', Validators.required],
        delegation: ['', Validators.required],
        nationalite: ['', Validators.required],
        email: ['', Validators.required],
      });

    }
    onInput(event: any) {
      const inputValue: string = event.target.value;
      const numericValue = inputValue.replace(/\D/g, ''); // Supprime tous les caractères non numériques

      if (numericValue.length >= 8) {
        event.target.value = numericValue.slice(0, 8); // Tronque l'entrée à la longueur maximale de 8
        event.target.blur(); // Supprime le focus de l'entrée
      } else {
        event.target.value = numericValue; // Met à jour la valeur avec les chiffres uniquement
      }
    }


  ngOnInit() {
  }
  navigateToOffres() {
    this.router.navigate(['/offres']);
  }


  async onSubmit(){
    this.ConfirmationFormSubmitAlert('Confirmation', 'Confirmer la submission ?');
  }

  async submitForm() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    const formData = this.prospector.value;
    console.log(formData);
    this.http.post('http://localhost:8080/Activation/add', formData)
    .subscribe((response) => {
      loading.dismiss();
      this.prospector.reset();
      this.presentAlert('Success', 'Votre demande  a été envoyée avec succès.');
      console.log('Form submitted successfully');
    }, (error) => {
      loading.dismiss();
      this.presentAlert('Error', 'Failed to save data to the database. Please try again later.');
      console.error('Error submitting form:', error);
    });

  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
      {
        text: 'OK',
        handler: () => {
          console.log('OK clicked');
        }
      }]
    });
    await alert.present();
  }
  async ConfirmationFormSubmitAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'OK',
        handler: () => {
          this.submitForm();
        }
      }]
    });
    await alert.present();
  }
}

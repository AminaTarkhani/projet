import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-reglement',
  templateUrl: './reglement.page.html',
  styleUrls: ['./reglement.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ReglementPage implements OnInit {
  reg: FormGroup = this.formBuilder.group({
    paiement:['',Validators.required],
    montant:['',Validators.required],
    cin: ['', [Validators.required, Validators.maxLength(8)]],
    code:['',Validators.required],
    naissance:['',Validators.required],
    rib:['',Validators.required]

  });

  constructor(private formBuilder: FormBuilder,private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
  }
  submit(){}
 Valider(){
  const formData = this.reg.value;
  this.http.post('http://localhost:8080/Reglement/add', formData)
  .subscribe(response => {
    console.log('Données enregistrées avec succès !');
  }, error => {
    console.error('Une erreur s\'est produite lors de l\'enregistrement des données :', error);

  });
  this.submit();
    const emailEndpoint = 'http://localhost:8080/email/send';
    const smsEndpoint = 'http://localhost:8080/ooredoo/SMS';

    const emailData = new FormData();
    emailData.append('to', 'amina.tarkhanitarkhani@gmail.com');
    emailData.append('cc', 'amina.tarkhanitarkhani@gmail.com');
    emailData.append('subject', 'ACTIVATION FORFAIT');
    emailData.append('body', 'Félicitation votre forfait a été activé avec succès');

    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    const file = fileInput?.files?.[0];

    if (file) {
      emailData.append('file', file);
    }

    const smsData = {
      smsMessages: 'Congratulations! Your account has been activated successfully.',
      destinationSMSNumber: '+21624437860'
    };

    const emailRequest = this.http.post(emailEndpoint, emailData);
    const smsRequest = this.http.post(smsEndpoint, smsData);


    forkJoin([emailRequest, smsRequest]).subscribe(
      (responses) => {
        console.log('Requests completed successfully!');
        // Handle responses as needed
      },
      (error) => {
        console.error('Failed to send requests:', error);
      }
    );

}
retour(){this.router.navigate(['/fixe-jdid'])}

  }



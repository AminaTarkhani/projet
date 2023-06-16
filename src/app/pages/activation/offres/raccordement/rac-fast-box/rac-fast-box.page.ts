import { Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, Platform } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Swiper } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-rac-fast-box',
  templateUrl: './rac-fast-box.page.html',
  styleUrls: ['./rac-fast-box.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RacFastBoxPage implements OnInit {
  imageSource: string = '';


  fastBox: FormGroup;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private platform: Platform) {
    this.fastBox = this.formBuilder.group({
      offres: ['', Validators.required],
      debit: ['', Validators.required],
      mondatTT: [''],

    });
  }
  activeSlide: number = 0;

  swiperSlideChanged(event: any) {
    this.activeSlide = event.realIndex;
  }



  ImageSourceContrat: string = '';

  ngOnInit() {}
  Suivant() {
    this.swiper?.slideNext();

  }

  submit() {}

  Mondat = async () => {
    const image = await this.captureImage();
    if (image?.dataUrl) {
      const imageData = image.dataUrl.split(',')[1]; // Supprimer le préfixe MIME
      this.ImageSourceContrat = imageData;
    } else {
      console.log('No image data available');
    }
  };

  private captureImage = async () => {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

  };

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  captureDateTime: string | undefined;



  async captureImages() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 90,
      });

      const captureDateTime = new Date().toLocaleString();
      const validImages = image.base64String;

      // Créer un nouvel élément image
      const img = new Image();

      // Définir l'événement onload pour l'image
      img.onload = () => {
        // Créer un nouvel élément canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;

          // Dessiner l'image sur le canvas
          context.drawImage(img, 0, 0);

          // Dessiner la date et l'heure sur le canvas
          const dateTimeText = captureDateTime;
          context.font = '20px Arial';
          context.fillStyle = 'white';
          context.fillText(dateTimeText, 10, 30);

          // Convertir le canvas en base64
          const imageDataWithDateTime = canvas.toDataURL('image/jpeg', 0.9);

          // Utiliser imageDataWithDateTime comme vous le souhaitez
          console.log('Image avec date et heure:', imageDataWithDateTime);

          // Afficher l'image avec la date et l'heure
          this.imageSource = imageDataWithDateTime;
        } else {
          console.error('Impossible d"obtenir le contexte du canvas.');
        }
      };

      // Définir la source de l'image sur l'image capturée
      img.src = 'data:image/jpeg;base64,' + validImages;
    } catch (error) {
      console.error('Erreur lors de la capture d"images :', error);
    }
  }


  async submitForm() {
    const loading = await this.loadingCtrl.create({
      message: 'Veuillez patienter...',
    });
    await loading.present();
    const formData = this.fastBox.value;


    console.log(formData);
    this.http.post('http://localhost:8080/Raccordement/add', formData)
    .subscribe((response) => {
      loading.dismiss();
      this.fastBox.reset();
      this.presentAlert('Succès', 'Votre demande de raccordement a été envoyée avec succès.');
      console.log('Form submitted successfully');
    }, (error) => {
      loading.dismiss();
      this.presentAlert('Erreur', 'Échec de l"enregistrement des données dans la base de données. Veuillez réessayer plus tard.');
      console.error('Error submitting form:', error);
    });

  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: []
    });
    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 1000);
  }



}

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IonicSlides } from '@ionic/angular';
import { Swiper } from 'swiper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';



@Component({
  selector: 'app-fixe-jdid',
  templateUrl: './fixe-jdid.page.html',
  styleUrls: ['./fixe-jdid.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FixeJdidPage implements OnInit {
  searchResults: any | null = null;
  selectedMsisdn: string | undefined;
  availableMsisdns: string[] = [];
  ImageSourceContrat: string = '';
  signatureImage!: string;
  private signaturePadInstance: any;
  @ViewChild('signaturePad') signaturePad: any;
  private signaturePadOptions: Object = { // options de signature_pad
    backgroundColor: '#ffffff',
    penColor: '#000000',
    minWidth: 2,
    maxWidth: 4,
  };
  private canvas: any;


  error: string| undefined;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  fixe: FormGroup = this.formBuilder.group({
    debit: ['', Validators.required],
    type: ['', Validators.required],
    abonnement:['',Validators.required],
    imei:['',Validators.required],
    kitcode:['',Validators.required],
    recherche:['',Validators.required],
    formulaire:['',Validators.required],
    msisdn:['',Validators.required],
    conditions:['',Validators.required],
    preuves:['',Validators.required],
    contrats:['',Validators.required]


  });

  constructor(private formBuilder: FormBuilder,private http: HttpClient,  private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private router: Router) { }

  ngOnInit() {
    this.fetchAvailableMsisdns();

  }
  submit() {
    if (this.fixe.valid && this.fixe.value.msisdn) {
      const formData = this.fixe.value;

    } else {
    }
    this.swiper?.slideNext();
  }


  searchMsisdn(event: any) {
    const msisdnControl = this.fixe.get('msisdn');

    const msisdn = event.target.value || '';
    const url = `http://localhost:8080/FixeJdid/search?msisdn=${msisdn}`;

    this.http.get(url).subscribe((result: any) => {
      this.searchResults = result || [];
      this.selectedMsisdn = '';
      this.error = '';

      // Créer un tableau pour stocker les MSISDN déjà affichés
      const displayedMsisdns: string[] = [];

      // Filtrer les résultats pour n'afficher qu'une seule fois chaque MSISDN
      this.searchResults = this.searchResults.filter((item: any) => {
        if (!displayedMsisdns.includes(item.msisdn)) {
          displayedMsisdns.push(item.msisdn);
          return true;
        }
        return false;
      });

      if (this.searchResults.length === 0) {
        this.error = 'Le MSISDN n\'existe pas.';
      }
    });
  }


  selectMsisdn(msisdn: string) {
    this.checkMsisdnAvailability(msisdn)
      .then((msisdnDisponible: boolean) => {
        if (msisdnDisponible) {
          this.fixe.patchValue({ msisdn: msisdn });
          this.error = '';
        } else {
          this.selectedMsisdn = '';
          this.error = 'Le MSISDN n\'est pas disponible.';
          this.fetchAvailableMsisdns();
        }
      })
      .catch((error: any) => {
        console.error('Error checking MSISDN availability:', error);
        this.selectedMsisdn = '';
        this.error = 'Une erreur s\'est produite lors de la vérification de la disponibilité du MSISDN.';
      });
  }

  fetchAvailableMsisdns() {
    const url = 'http://localhost:8080/FixeJdid/getAvailableMsisdns'; // Replace with the appropriate API endpoint

    this.http.get(url)
      .toPromise()
      .then((result: any) => {
        // Update the list of available MSISDNs
        this.availableMsisdns = result;
      })
      .catch((error: any) => {
        console.error('Error fetching available MSISDNs:', error);
      });
  }

  checkMsisdnAvailability(msisdn: string): Promise<boolean> {
    const url = `http://localhost:8080/FixeJdid/search?msisdn=${msisdn}`;

    return this.http.get(url)
      .toPromise()
      .then((result: any) => {
        // Check if the result contains any MSISDNs
        if (result && result.length > 0) {
          // MSISDN is available
          return true;
        } else {
          // MSISDN is not available
          return false;
        }
      })
      .catch((error: any) => {
        console.error('Error checking MSISDN availability:', error);
        throw new Error('Une erreur s\'est produite lors de la vérification de la disponibilité du MSISDN.');
      });
  }
//upload ImageFormulaire
isFirstSlideValid = false;
isFormValid: boolean = false;
isFormFilled: boolean = false;

currentSlideIndex = 0;


Formulaire = async () => {
  const image = await this.captureImages();
  if (image?.dataUrl) {
    const imageData = image.dataUrl.split(',')[1]; // Supprimer le préfixe MIME
    this.ImageSourceContrat = imageData;
  } else {
    console.log('No image data available');
  }
};

private captureImages = async () => {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
  });

};
Conditions = async () => {
  const image = await this.captureImages();
  if (image?.dataUrl) {
    const imageData = image.dataUrl.split(',')[1]; // Supprimer le préfixe MIME
    this.ImageSourceContrat = imageData;
  } else {
    console.log('No image data available');
  }
};
contrats= async () => {
  const image = await this.captureImages();
  if (image?.dataUrl) {
    const imageData = image.dataUrl.split(',')[1]; // Supprimer le préfixe MIME
    this.ImageSourceContrat = imageData;
  } else {
    console.log('No image data available');
  }
};
async contrat(){ try {

  const image = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,
    quality: 90
  });


const validImages = image.base64String;
console.log(validImages);
this.fixe.value.contrats = validImages;

console.log(this.fixe.value.contrats);


} catch (error) {
console.error('Error capturing images:', error);

}
}
async preuve(){
  try {

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90
    });


  const validImages = image.base64String;
  console.log(validImages);
  this.fixe.value.preuves = validImages;

  console.log(this.fixe.value.preuves);


  } catch (error) {
  console.error('Error capturing images:', error);

  }}



async condition() {
   try {

  const image = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,
    quality: 90
  });


const validImages = image.base64String;
console.log(validImages);
this.fixe.value.conditions = validImages;

console.log(this.fixe.value.conditions);


} catch (error) {
console.error('Error capturing images:', error);

}}

async formulaire() {

  try {

      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 90
      });


    const validImages = image.base64String;
    console.log(validImages);
    this.fixe.value.formulaire = validImages;
    console.log(this.fixe.value.formulaire);


  } catch (error) {
    console.error('Error capturing images:', error);

  }
}

async submitForm() {
  const loading = await this.loadingCtrl.create({
    message: 'Veuillez patienter...',
  });
  await loading.present();
  const formData = this.fixe.value;
  console.log(formData);
  this.http.post('http://localhost:8080/FixeJdid/ajouter', formData)
  .subscribe((response) => {
    loading.dismiss();
    this.fixe.reset();
    this.presentAlert('Succès', 'Votre demande a été envoyée avec succès.');
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
selectedTypeDeBox: string | undefined;
updateTypeDeBox() {
  const typeDeBoxControl = this.fixe.get('type');

  if (typeDeBoxControl && typeDeBoxControl.value !== null) {
    this.selectedTypeDeBox = typeDeBoxControl.value as string;
    typeDeBoxControl.patchValue(this.selectedTypeDeBox);
  } else {
    this.selectedTypeDeBox = undefined;
  }
}
updateAbonnement(value: string) {
  const abonnementControl = this.fixe.get('abonnement');
  if (abonnementControl) {
    abonnementControl.setValue(value);
  }

}
swiperReady() {
  this.swiper = this.swiperRef?.nativeElement.swiper;
}

goNext() {
  this.swiper?.slideNext();
}
activeSlide: number = 0;

swiperSlideChanged(event: any) {
  this.activeSlide = event.realIndex;
}



public displaySignatureImage(imageBlob: Blob) {
  const reader = new FileReader();
  reader.onloadend = () => {
    const imageDataURL = reader.result as string;
    this.signatureImage = imageDataURL;
  };
  reader.readAsDataURL(imageBlob);

}
ngAfterViewInit() {
this.canvas = this.signaturePad.nativeElement;
this.signaturePadInstance = new SignaturePad(this.canvas, this.signaturePadOptions);
}
public clear() {
this.signaturePadInstance.clear();
}
reglement(){ this.router.navigate(['/reglement'])}
Submit(){
const dataURL = this.signaturePadInstance.toDataURL();
const signatureData = { signature: dataURL };
this.http.post('http://localhost:8080/FixeJdid/add', { signature: dataURL })
.subscribe(response => {
  console.log('Signature saved successfully!');

}, error => {
  console.error('Failed to save the signature:', error);
});

}
}









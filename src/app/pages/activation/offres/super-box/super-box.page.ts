import { Component, OnInit,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA ,ElementRef} from '@angular/core';
import SignaturePad from 'signature_pad';



@Component({
  selector: 'app-super-box',
  templateUrl: './super-box.page.html',
  styleUrls: ['./super-box.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SuperBoxPage implements OnInit {
  @ViewChild('signaturePad') signaturePad: any;
  private signaturePadOptions: Object = { // options de signature_pad
    backgroundColor: '#ffffff',
    penColor: '#000000',
    minWidth: 2,
    maxWidth: 4,
  };
  private canvas: any;
  private signaturePadInstance: any;




  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.canvas = this.signaturePad.nativeElement;
    this.signaturePadInstance = new SignaturePad(this.canvas, this.signaturePadOptions);
  }

  public clear() {
    this.signaturePadInstance.clear();
  }

  public save() {
    const dataURL = this.signaturePadInstance.toDataURL();
    console.log(dataURL);

  }

  submit() {
    const signature = this.signaturePad.toDataURL(); // ou this.signaturePad.toData()
    // Envoyer la signature à l'API ou la stocker localement
  }
  ActiverBox(){}
  Valider(){}
}



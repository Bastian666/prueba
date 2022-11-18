import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from 'src/app/services/registro.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

  constructor(
    private service: RegistroService,
    public fromBuild: FormBuilder,
    public alertControl: AlertController
  ) {
    this.formRegistro = this.fromBuild.group({
      'firstNameR': new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      'lastNameR': new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      'ageR': new FormControl("",[Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      'usernameR': new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      'passwordR': new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      'birthDateR': new FormControl("",Validators.required),
      'genderR': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  public campo(control: string) {
    return this.formRegistro.get(control);
  }

  async guardarDatos(){
    if(this.formRegistro.invalid){
      const alert = await this.alertControl.create({
        header: 'Datos incompletos',
        message: 'Debes completar todos los datos correspondientes',
        buttons: ['Ok']
      });
      await alert.present();

    }else{
      this.service.registro({
        firstName: this.formRegistro.value.firstNameR,
        username: this.formRegistro.value.usernameR,
        password: this.formRegistro.value.passwordR,
        lastName: this.formRegistro.value.lastNameR,
        age: this.formRegistro.value.ageR,
        birthDate: this.formRegistro.value.birthDateR,
        gender: this.formRegistro.value.genderR
      }).subscribe(resultado => {console.log(resultado)})
    }
  }
}

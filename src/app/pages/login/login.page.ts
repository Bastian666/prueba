import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
import { RegistroService } from 'src/app/services/registro.service';
import { AlertController } from '@ionic/angular';
import { timeStamp } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formLogin: FormGroup;

  constructor(private http: HttpClient,
    public alertControl: AlertController,
    private fromBuild: FormBuilder,
    private service: RegistroService,
    private router: Router) {
      this.formLogin = this.fromBuild.group({
        'username': new FormControl("",Validators.required),
        'password': new FormControl("",Validators.required)
      });
     }

  ngOnInit() {
  }

  async Login(){
    if(this.formLogin.invalid){
      const alert = await this.alertControl.create({
        header: 'Datos incompletos',
        message: 'Debes completar todos los datos correspondientes',
        buttons: ['Ok']
      });
      await alert.present();



    }else{
      this.service.ingreso({
        username: this.formLogin.value.username,
        password: this.formLogin.value.password
      }).subscribe(resultado => {
        const token = resultado.token;
        sessionStorage.setItem('token', token)
        console.log(resultado)
        this.router.navigate(['pagina-principal'])
      })
    }
    }
  }



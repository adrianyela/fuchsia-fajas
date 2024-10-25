import { Component, OnInit } from '@angular/core';
import { NavComponentWithProps,LoadingController,ToastController,ActionSheetController,AlertController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { Usuario } from '../usuarios';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})


export class RegistrarPage implements OnInit {

  usuario={} as Usuario;

  constructor(
    public autenticar: AutenticacionService, 
    public toastCtrl: ToastController, 
    private route: ActivatedRoute, 
    private router: Router, 
  ) { }

  registrar(usuario:Usuario){

    this.autenticar.registerUser(usuario.correo,usuario.contrasenia)
    .then((resultados:any)=>{
      this.mostrarMensaje('usuario registrado correctamentre');
      this.router.navigate(['./login']);
    },err=>{
      this.mostrarMensaje('Hubo un error: '+err);
    });
  }

  mostrarMensaje(mensaje:string){
    this.toastCtrl.create({
      message:mensaje,
      duration:2000
    }).then(toast=>toast.present());
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NavComponentWithProps,LoadingController,ToastController,ActionSheetController,AlertController } 
from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { Usuario } from '../usuarios';
import { AutenticacionService } from '../services/autenticacion.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  usuario = {} as Usuario;

  constructor(
    public autenticar: AutenticacionService, 
    public toastCtrl: ToastController, 
    private route: ActivatedRoute, 
    private router: Router, 
    public ngFireAuth: AngularFireAuth
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        // Si al ingresar a login ya ha iniciado sesión, redirecciona a tabs
        this.router.navigate(['./tabs']);
      }
    });
  }

  ingresar(usuario: Usuario) {
    // Método ingresar recibe un parámetro del tipo Usuario
    this.autenticar.signIn(usuario.correo, usuario.contrasenia)
      .then((resultado: any) => {
        // Si credenciales son correctas muestra mensaje de bienvenida y redirige a tabs
        this.mostrarMensaje('Bienvenido ' +resultado.user._delegate.email+'!');
        this.router.navigate(['tabs']);
      }, err => {
        this.mostrarMensaje('Hubo un error: ' + err);
      });
  }

  // Método para mostrar notificaciones
  mostrarMensaje(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 5000
    }).then(toast => toast.present());
  }

  ngOnInit() {}


  loginGoogleAuth(){
    this.autenticar.loginWithGoogle()
    .then(user=>console.log(user))
    .catch(error=>console.log(error));
  }
}

              
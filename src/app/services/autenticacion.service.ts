import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Usuario } from '../usuarios';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider, UserCredential, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  public userData: any;
  provider = new GoogleAuthProvider();

  // El constructor inicializa los métodos de autenticación de la librería Firebase
  constructor(private firebaseAuth: AngularFireAuth, public router: Router) {
    // Este método verifica el estado de la autenticación
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        this.router.navigate(['./login']);
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }

  signIn(email:any,password:any){
    return this.firebaseAuth.signInWithEmailAndPassword(email,password);
  }

  registerUser(email:string,password:string){
    return this.firebaseAuth.createUserWithEmailAndPassword(email,password);
  }

  signOut(){
    return this.firebaseAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);

    });
  }

  loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    return this.firebaseAuth.signInWithPopup(provider);
  }
  
}

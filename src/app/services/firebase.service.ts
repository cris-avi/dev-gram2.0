import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  fireStore = inject(AngularFirestore);

  // ==================== Autenticación ====================

  // ============ Sign In ============
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ============ register ============
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ============ Actualizar perfil ============
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }


  //======================Base de datos======================
  //============Agregar un documento============
  async setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //============Obetener un documento============
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}

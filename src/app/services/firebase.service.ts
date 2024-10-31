import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
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
  // signUp(user: User) {
  //   return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  // }

  // Método de registro para desarrolladores
  async registerDeveloper(user: User) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), user.email, user.password);
    
    if (user.name) {
      await updateProfile(userCredential.user, { displayName: user.name });
    }
    // Almacenar datos adicionales en Firestore en la colección `Desarrolladores`
    const developerDocRef = doc(getFirestore(),`Desarrolladores/${userCredential.user.uid}`);
    await setDoc(developerDocRef, {
      uid: userCredential.user.uid,
      email: user.email,
      name: user.name,
      userType: 'Desarrollador',
      speciality: user.speciality
    });

    return userCredential;
  }

  // Método de registro para clientes
  async registerClient(user: User) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), user.email, user.password);

    // Si se proporciona un displayName, actualizamos el perfil
    if (user.name) {
      await updateProfile(userCredential.user, { displayName: user.name });
    }

    // Almacenar datos adicionales en Firestore en la colección `Clientes`
    const clientDocRef = doc(getFirestore(), `Clientes/${userCredential.user.uid}`);
    await setDoc(clientDocRef, {
      email: user.email,
      displayName: user.name,
      userType: 'Cliente',
    });
    return userCredential;
  }

  // ============ Actualizar perfil ============
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // ============ Restablecer contraseña ============

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
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

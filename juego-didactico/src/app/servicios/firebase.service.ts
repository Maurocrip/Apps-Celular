import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, collectionData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  readonly auth = inject(Auth);
  readonly colUsuarios = collection(this.firestore, 'usuario');
  constructor(public firestore: Firestore) { }

  RegistrarUsuario( email : string, pasword: string)
  {
    return createUserWithEmailAndPassword(this.auth, email, pasword);
  }

  LogIn(email : string, pasword: string)
  {
    return signInWithEmailAndPassword(this.auth, email, pasword);
  }

  DesLogueo(auth : Auth)
  {
    return signOut(auth);
  }

  async GuardarUsuario(email : string, usuario : string)
  {
    const documento = doc(this.colUsuarios);
    const id = documento.id;
    await setDoc(documento,{ Email: email, Id: id, Usuario: usuario});
  }

  TraerUsuario()
  {
    return collectionData(this.colUsuarios);
  }
}

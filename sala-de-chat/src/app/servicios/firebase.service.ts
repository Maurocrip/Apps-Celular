import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, collectionData, DocumentData, CollectionReference, query, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  readonly auth = inject(Auth);
  readonly colUsuarios = collection(this.firestore, 'usuario');
  readonly colChat1 = collection(this.firestore, 'chat1');
  readonly colChat2 = collection(this.firestore, 'chat2');
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

  async GuardarMensaje(mensaje : string, usuario : string, coleccion : CollectionReference<DocumentData, DocumentData>, hora: number, fecha: string)
  {
    const documento = doc(coleccion);
    const id = documento.id;
    await setDoc(documento,{ Texto: mensaje, Id: id, Usuario: usuario, Hora: hora, Fecha: fecha});
  }

  TraerUsuario()
  {
    return collectionData(this.colUsuarios);
  }

  TraerChat<T = Array<any>>(collectionName: string): Observable<T[]> 
  {
    let docs = query(collection(this.firestore, collectionName));
  
    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(docs, querySnapshot => {
        const collection: T[] = [];
  
        querySnapshot.forEach(doc => {
          const simpleDoc = { ...doc.data() as T };
          collection.push(simpleDoc);
        });
  
        subscriber.next(collection);
      });
  
      // Retornar la función de unsubscribe para cancelar la suscripción cuando sea necesario
      return () => unsubscribe();
    });
  }
}

import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, collectionData, query, where, onSnapshot, orderBy, limit, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService 
{
  readonly auth = inject(Auth);
  readonly colUsuarios = collection(this.firestore, 'usuario');
  readonly colTeimposFacil = collection(this.firestore, 'facil');
  readonly colTeimposMedio = collection(this.firestore, 'medio');
  readonly colTeimposDificil = collection(this.firestore, 'dificil');
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
  

  async GuardarTiempo(colecccion : CollectionReference<DocumentData, DocumentData>, time : number, usuario : string)
  {
    const documento = doc(colecccion);
    const id = documento.id;
    await setDoc(documento,{ Tiempo: time, Id: id, Usuario: usuario});
  }

  TraerUsuario()
  {
    return collectionData(this.colUsuarios);
  }

  ObtenerColeccionConCondicion<T = Array<any>>(collectionName: string): Observable<T[]> 
  {
    let docs = query(
      collection(this.firestore, collectionName),
      orderBy('Tiempo'), // Reemplaza 'campoParaOrdenar' con el nombre del campo por el que deseas ordenar
      limit(5) // Limitar resultados a 5 documentos
    );
  
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

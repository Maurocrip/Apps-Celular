import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, collectionData, updateDoc, query, onSnapshot, orderBy, OrderByDirection, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService 
{
  readonly auth = inject(Auth);
  readonly colUsuarios = collection(this.firestore, 'usuario');
  readonly colLindas = collection(this.firestore, 'lindas');
  readonly colFeas = collection(this.firestore, 'feas');
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
  async GuardarFotoLinda(usuario : string, path: string, day : string, hora: string)
  {
    const documento = doc(this.colLindas);
    const id = documento.id;
    await setDoc(documento,{ Path: path,Id: id, Usuario: usuario, Day:day, Hora:hora, Votos: []});
  }
  async GuardarFotoFea(usuario : string, path: string, day : string, hora: string)
  {
    const documento = doc(this.colFeas);
    const id = documento.id;
    await setDoc(documento,{ Path: path,Id: id, Usuario: usuario, Day:day, Hora:hora, Votos: []});
  }

  TraerUsuario()
  {
    return collectionData(this.colUsuarios);
  }
  TraerFotosLindas()
  {
    return collectionData(this.colLindas);
  }
  TraerFotosFeas()
  {
    return collectionData(this.colFeas);

  }

  getAllSnapshot<T=Array<any>>(collectionName: string, order1: string, order2: string, modo: OrderByDirection = 'desc'): Observable<T[]> 
  {    
    let docs = query( collection(this.firestore, collectionName), orderBy(order1, modo), orderBy(order2, modo) );
  
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

  ObtenerColecccionConCondicion <T=Array<any>>( collectionName: string, fieldName: string, value: any): Observable<T[]> 
  {
    let docs = query( collection(this.firestore, collectionName),
    where(fieldName, '==', value) );
  
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


  ModificarVotos( docId: string, array : Array<any>, tipo : string)
  {
    const docRef = doc(this.firestore, tipo, docId);
    return updateDoc(docRef, {Votos: array});
  }
}

function callback(documents: any[]) {
  throw new Error('Function not implemented.');
}


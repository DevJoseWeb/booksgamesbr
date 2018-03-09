import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Contato } from './contato-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
//  firebase.firestore.setLogLevel('debug');
interface NewContato {
    nome: string;
    email: string;
    celular: string;
    mensagem: string;
    area: string;
    //id?: string;
    time: number;
}

@Injectable()
export class ContatoService {

  contatosCollection: AngularFirestoreCollection<Contato>;
  contatoDocument:   AngularFirestoreDocument<Contato>;

  constructor(private afs: AngularFirestore) {
    this.contatosCollection = this.afs.collection('contatos', (ref) => ref.orderBy('nome', 'desc').limit(10));
  }

  getData(): Observable<Contato[]> {
    return this.contatosCollection.valueChanges();
  }

  getSnapshot(): Observable<Contato[]> {
     return this.contatosCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Contato;
        return { 
          id: a.payload.doc.id, 
          nome: data.nome, 
          email: data.email,
          celular: data.celular,
          mensagem: data.mensagem, 
          area: data.area,
          time: data.time
        };

      });
    });
  }

  getContato(id: string) {
      return this.afs.doc<Contato>(`contatos/${id}`);
  }

  create(
       nome: string,
       email: string, 
       celular: string, 
       mensagem: string,  
       area: string) {
    const Contato = {
       nome,
       email,
       celular,
       mensagem,
       area,
       time: new Date().getTime(),
    };
    return this.contatosCollection.add(Contato);
  }
/*
  updateContato(id: string, data: Partial<Contato>) {
    return this.getContato(id).update(data);
  }

  deleteContato(id: string) {
    return this.getContato(id).delete();
  }
  */
}

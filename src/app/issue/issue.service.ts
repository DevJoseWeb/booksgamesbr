import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Issue } from './issue-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewIssue {
  nome: string;
  inicio: string;
  andamento: string;
  fim: string;
  valor: string;
  //id?: string;
  time: number;
}

@Injectable()
export class IssueService {

  issuesCollection: AngularFirestoreCollection<Issue>;
  issueDocument:   AngularFirestoreDocument<Issue>;

  constructor(private afs: AngularFirestore) {
    this.issuesCollection = this.afs.collection('issues', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<Issue[]> {
    return this.issuesCollection.valueChanges();
  }

  getSnapshot(): Observable<Issue[]> {
    return this.issuesCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Issue;
        return { 
          id: a.payload.doc.id, 
          nome: data.nome, 
          inicio: data.inicio,
          andamento: data.andamento,
          fim: data.fim, 
          valor: data.valor,
          time: data.time
        };

      });
    });
  }

  getIssue(id: string) {
    return this.afs.doc<Issue>(`issues/${id}`);
  }

  create(
       nome: string,
       inicio: string, 
       andamento: string,  
       fim: string,
       valor: string
      ) {
    const Issue = {
       nome,
       inicio,
       andamento,
       fim,
       valor,
       time: new Date().getTime(),
    };
    return this.issuesCollection.add(Issue);
  }

  /*
  updateIssue(id: string, data: Partial<Issue>) {
    return this.getIssue(id).update(data);
  }

  deleteIssue(id: string) {
    return this.getIssue(id).delete();
  }
  */
}

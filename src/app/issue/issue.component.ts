import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { IssueService } from './issue.service';
import { Issue } from './issue-model';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'anms-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  issues: Observable<Issue[]>;
  nome: string;
  inicio: string;
  andamento: string;
  fim: string;
  valor: string;
  id?: string;
  time: number;

  constructor(private issueService: IssueService, public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.issues = this.issueService.getSnapshot();
  }

  createIssue() {
    this.issueService.create(this.nome, this.inicio, this.andamento, this.fim, this.valor);
    this.nome = '';
    this.inicio = '';
    this.andamento = '';
    this.fim = '';
    this.valor = '';
    this.snackBar.open('Sua Mensagem foi Enviada com Sucesso, nosso Robô Paula, vai retornar !', 'X', { duration: 1200 });
  }
}
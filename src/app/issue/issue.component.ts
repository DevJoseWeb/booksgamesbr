import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { IssueService } from './issue.service';
import { Issue } from './issue-model';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { EditDialogComponent } from './edit-dialog.component';

import { SharedModule } from '../shared/shared.module'
/*
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
*/
@Component({
  selector: 'anms-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass']
})

export class IssueComponent implements OnInit, AfterViewInit {

  displayedColumns = ['nome', 'inicio', 'andamento', 'fim', 'valor', 'editar'];
  dataSource: MatTableDataSource<any>; 

  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  issues: Observable<Issue[]>;
  nome: string;
  inicio: string;
  andamento: string;
  fim: string;
  valor: string;
  uid?: string;
  time: number;

  constructor(
    private issueService: IssueService, 
    public snackBar: MatSnackBar,
    private afs: AngularFirestore, 
    public dialog: MatDialog//,
    //public sort: MatSort
     
  ) { }

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
    this.snackBar.open('Sua Issue foi Cadastrada com Sucesso, nosso Robô Paula, vai acompanhar !', 'X', { duration: 2200 });
  }

  ngAfterViewInit() {
    this.afs.collection<any>('issues').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data); 
      //this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: data
    });
}
}
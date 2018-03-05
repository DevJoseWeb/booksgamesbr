import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import { NIGHT_MODE_THEME, selectorSettings } from './settings';

@Component({
    selector: 'barra',
    templateUrl: './barra.component.html',
    styleUrls: ['./barra.component.css'],
  })

  export class BarraComponent implements OnInit{

    constructor(    
      public snackBar: MatSnackBar
    ) {}
  
    ngOnInit(){}

    openSnackBar() {
      this.snackBar.openFromComponent(BarraComponent, {duration: 500,
      });

     this.snackBar.open('CURIOSO PRA CARALHO');
    }

  }
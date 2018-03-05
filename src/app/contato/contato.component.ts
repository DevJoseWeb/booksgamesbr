import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'anms-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  constructor() { }

  ngOnInit() {
  }
}
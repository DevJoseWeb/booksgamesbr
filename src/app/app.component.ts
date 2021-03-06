import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';


import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  selectorAuth,
  routerTransition
} from '@app/core';

import { environment as env } from '@env/environment';
import { NIGHT_MODE_THEME, selectorSettings } from './settings';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})

export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');

  navigation = [

    { link: 'about', label: 'Início' },
    { link: 'features', label: 'Nossos Games Educativos' },
    { link: 'examples', label: 'Sala de Aula Gamer' }
  
  ];

  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Configuração' }
  ];
  
  isAuthenticated;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    public snackBar: MatSnackBar,
    private titleService: Title
    
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        const { theme, autoNightMode } = settings;
        const hours = new Date().getHours();
        const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
          ? NIGHT_MODE_THEME
          : theme
        ).toLowerCase();
        this.componentCssClass = effectiveTheme;
        const classList = this.overlayContainer.getContainerElement().classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        classList.remove(...toRemove);
        classList.add(effectiveTheme);
      });
    this.store
      .select(selectorAuth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  openSnackBar() {
   //this.snackBar.openFromComponent(BarraCombcponent, { duration: 900, });
   this.snackBar.open('CURIOSO', 'X', { duration: 800 });
  }
}


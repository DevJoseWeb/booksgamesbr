import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import {
  selectorSettings,
  ActionSettingsChangeTheme,
  ActionSettingsChangeAutoNightMode,
  SettingsState,
  ActionSettingsPersist
} from '../settings.reducer';

@Component({
  selector: 'anms-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;

  themes = [
    { value: 'DEFAULT-THEME', label: 'Azul' },
    { value: 'LIGHT-THEME', label: 'Leve' },
    { value: 'BLACK-THEME', label: 'Escuro' }
  ];

  constructor(private store: Store<any>) {
    store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => (this.settings = settings));
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onAutoNightModeSelect({ value: autoNightMode }) {
    this.store.dispatch(
      new ActionSettingsChangeAutoNightMode({
        autoNightMode: autoNightMode === 'true'
      })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}

import { NgModule } from '@angular/core';

//IMPORT DOS COMPONENTES DO MATERIAL
import { SharedModule } from '@app/shared';

import { SnackbarComponent } from './snackbar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SnackbarComponent]
})
export class SnackbarModule {}

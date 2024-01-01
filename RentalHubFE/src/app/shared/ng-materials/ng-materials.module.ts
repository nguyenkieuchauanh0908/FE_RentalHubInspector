import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [
    MatDividerModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgImageSliderModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatDividerModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgImageSliderModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class NgMaterialsModule {}

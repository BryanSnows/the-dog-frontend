import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    NoResultsComponent,
    PaginationComponent,
    SearchBarComponent,
    ConfirmationModalComponent,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    MatSliderModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  declarations: [],
  exports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    NoResultsComponent,
    RouterModule,
    PaginationComponent,
    SearchBarComponent,
    ConfirmationModalComponent,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    MatSliderModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class SharedModule {}

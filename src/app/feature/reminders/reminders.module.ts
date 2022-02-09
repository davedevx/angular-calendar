import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@shared/shared.module';
import { WeatherModule } from '@feature/weather/weather.module';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';
import { ReminderDetailsDialogComponent } from './components/reminder-details-dialog/reminder-details-dialog.component';
import { ReminderFormDialogComponent } from './components/reminder-form-dialog/reminder-form-dialog.component';
import { AdditionalReminderDialogComponent } from './components/additional-reminders-dialog/additional-reminders-dialog.component';

export const MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
];

const COMPONENTS = [ReminderListComponent, ReminderDetailsDialogComponent, ReminderFormDialogComponent, AdditionalReminderDialogComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, WeatherModule, ...MATERIAL],
  providers: [{ provide: MatDialogRef, useValue: {} }],
})
export class RemindersModule {}

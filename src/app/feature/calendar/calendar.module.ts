import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '@shared/shared.module';
import { RemindersModule } from '@feature/reminders/reminders.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarService } from './services/calendar.service';

const MATERIAL: any = [MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule];

const COMPONENTS = [CalendarComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, SharedModule, CalendarRoutingModule, RemindersModule, ...MATERIAL],
  providers: [CalendarService],
})
export class CalendarModule {}

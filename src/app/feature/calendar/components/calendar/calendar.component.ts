import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DIALOG_WIDTH } from '@shared/constants/shared.constant';
import { ReminderFormDialogComponent } from '@feature/reminders/components/reminder-form-dialog/reminder-form-dialog.component';
import { Reminder } from '@feature/reminders/interfaces/reminder.interface';
import { CalendarDay } from '@feature/calendar/interfaces/calendar.interface';
import { CalendarService } from '@feature/calendar/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public selectedDate$: Observable<Date>;
  public dayNamesOfWeek: string[];
  public calendarDays$: Observable<CalendarDay[]>;

  constructor(private calendarService: CalendarService, private matDialog: MatDialog) {
    this.selectedDate$ = this.calendarService.getSelectedDate();
    this.dayNamesOfWeek = this.calendarService.getDayNamesOfWeek();
    this.calendarDays$ = combineLatest([this.selectedDate$, this.calendarService.getReminders()]).pipe(
      map(this.calendarService.createCalendarDays),
    );
  }

  public openReminderForm(reminder?: Reminder) {
    this.matDialog.open<ReminderFormDialogComponent>(ReminderFormDialogComponent, {
      data: {
        reminder,
      },
      width: DIALOG_WIDTH,
    });
  }

  public prevMonth() {
    this.calendarService.prevMonth();
  }

  public nextMonth() {
    this.calendarService.nextMonth();
  }

  public today() {
    this.calendarService.today();
  }
}

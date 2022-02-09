import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ColorMap } from '@feature/calendar/interfaces/calendar.interface';
import { CalendarService } from '@feature/calendar/services/calendar.service';
import { REMINDER_TEXT_MAX_LENGTH } from '@feature/reminders/constants/reminder.constant';
import { Color, Reminder, ReminderDialogData } from '@feature/reminders/interfaces/reminder.interface';

@Component({
  selector: 'app-reminder-form-dialog',
  templateUrl: './reminder-form-dialog.component.html',
  styleUrls: ['./reminder-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderFormDialogComponent {
  public form: FormGroup;
  public colors: string[];
  public colorMap: ColorMap;
  public maxTextLength: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReminderDialogData,
    private dialogRef: MatDialogRef<ReminderFormDialogComponent>,
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.initForm();
    this.colors = Object.keys(Color);
    this.colorMap = this.calendarService.getReminderColorMap();
    this.maxTextLength = REMINDER_TEXT_MAX_LENGTH;
  }

  public save() {
    const { text, city } = this.form.value;
    const data: Reminder = {
      ...this.data.reminder,
      ...this.form.value,
      text: text.trim(),
      city: city.trim(),
    };

    if (this.data.reminder?.id) {
      this.calendarService.editReminder(data);
    } else {
      this.calendarService.createReminder(data);
    }
    this.dialogRef.close();
    this.openSnackbar('Reminder saved');
  }

  public delete() {
    this.calendarService.deleteReminder(this.data.reminder.id);
    this.openSnackbar('Reminder deleted');
  }

  private initForm(): FormGroup {
    const { text, dateTime, color, city } = this.data.reminder || { text: '', dateTime: new Date(), color: Color.BLUE, city: '' };

    return this.formBuilder.group({
      text: [text, [Validators.required, Validators.maxLength(this.maxTextLength)]],
      dateTime: [dateTime, [Validators.required]],
      color: [color, [Validators.required]],
      city: [city],
    });
  }

  private openSnackbar(text: string) {
    this.snackBar.open(text, undefined, {
      duration: 2000,
    });
  }
}

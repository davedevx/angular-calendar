import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ReminderListDialogData } from '@feature/reminders/interfaces/reminder.interface';

@Component({
  selector: 'app-additional-reminders-dialog',
  templateUrl: './additional-reminders-dialog.component.html',
  styleUrls: ['./additional-reminders-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalReminderDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ReminderListDialogData) {}
}

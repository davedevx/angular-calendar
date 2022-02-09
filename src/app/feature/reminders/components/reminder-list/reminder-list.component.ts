import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DIALOG_WIDTH } from '@shared/constants/shared.constant';
import { MAX_REMINDERS_TO_RENDER_PER_DAY } from '@feature/calendar/constants/calendar.constant';
import { ColorMap } from '@feature/calendar/interfaces/calendar.interface';
import { CalendarService } from '@feature/calendar/services/calendar.service';
import { Reminder, ReminderDetailsDialogAfterCloseData, ReminderListDialogData } from '@feature/reminders/interfaces/reminder.interface';
import { ReminderDetailsDialogComponent } from '../reminder-details-dialog/reminder-details-dialog.component';
import { ReminderFormDialogComponent } from '../reminder-form-dialog/reminder-form-dialog.component';
import { AdditionalReminderDialogComponent } from '../additional-reminders-dialog/additional-reminders-dialog.component';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderListComponent {
  @Input() public reminders: Reminder[] = [];
  @Input() public isAdditional: boolean = false;

  public readonly colorMap: ColorMap;
  public readonly maxRemindersToRenderPerDay: number;

  constructor(
    private additionalReminderDialogRef: MatDialogRef<AdditionalReminderDialogComponent, ReminderListDialogData>,
    private calendarService: CalendarService,
    private matDialog: MatDialog,
  ) {
    this.colorMap = this.calendarService.getReminderColorMap();
    this.maxRemindersToRenderPerDay = MAX_REMINDERS_TO_RENDER_PER_DAY;
  }

  public openReminderDetails(reminder: Reminder) {
    if (this.isAdditional) {
      this.additionalReminderDialogRef.close();
    }

    const detailsDialogRef: MatDialogRef<ReminderDetailsDialogComponent, ReminderDetailsDialogAfterCloseData> =
      this.matDialog.open<ReminderDetailsDialogComponent>(ReminderDetailsDialogComponent, {
        data: {
          reminder,
        },
        width: DIALOG_WIDTH,
      });

    detailsDialogRef.afterClosed().subscribe((result) => {
      if (result?.isEdit) {
        this.openReminderForm(reminder);
      }
    });
  }

  public openReminderForm(reminder?: Reminder) {
    this.matDialog.open<ReminderFormDialogComponent>(ReminderFormDialogComponent, {
      data: {
        reminder,
      },
      width: DIALOG_WIDTH,
    });
  }

  public showAdditionalRemindersModal() {
    this.matDialog.open<AdditionalReminderDialogComponent>(AdditionalReminderDialogComponent, {
      data: {
        reminders: this.reminders.slice(this.maxRemindersToRenderPerDay),
      },
      width: DIALOG_WIDTH,
    });
  }
}

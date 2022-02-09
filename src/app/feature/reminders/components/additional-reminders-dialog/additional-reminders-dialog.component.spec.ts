import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { AdditionalReminderDialogComponent } from './additional-reminders-dialog.component';

describe('AdditionalReminderDialogComponent', () => {
  let component: AdditionalReminderDialogComponent;
  let fixture: ComponentFixture<AdditionalReminderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalReminderDialogComponent],
      imports: [MatDialogModule],
      providers: [CalendarService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

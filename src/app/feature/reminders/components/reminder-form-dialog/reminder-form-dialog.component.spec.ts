import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { MATERIAL } from '@feature/reminders/reminders.module';
import { ReminderFormDialogComponent } from './reminder-form-dialog.component';

describe('ReminderFormComponent', () => {
  let component: ReminderFormDialogComponent;
  let fixture: ComponentFixture<ReminderFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReminderFormDialogComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatDialogModule, NoopAnimationsModule, ...MATERIAL],
      providers: [
        CalendarService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

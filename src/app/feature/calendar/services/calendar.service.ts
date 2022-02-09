import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isWeekend from 'date-fns/isWeekend';
import getDay from 'date-fns/getDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';

import { Color, Reminder } from '@feature/reminders/interfaces/reminder.interface';
import { REMINDER_TEXT_MAX_LENGTH } from '@feature/reminders/constants/reminder.constant';
import { CalendarDay, ColorMap } from '../interfaces/calendar.interface';
import { DATE_FORMAT, FIRST_DAY_OF_WEEK_INDEX, LAST_DAY_OF_WEEK_INDEX } from '../constants/calendar.constant';

@Injectable()
export class CalendarService {
  private dayNamesOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private selectedDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  private reminders$: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);
  private reminderColorMap: ColorMap = {
    [Color.RED]: '#D50001',
    [Color.GREEN]: '#0A8043',
    [Color.BLUE]: '#039BE5',
    [Color.YELLOW]: '#F5BF25',
  };

  public createReminder(data: Omit<Reminder, 'id'>) {
    const { text } = data;
    const newItem = {
      ...data,
      id: (Date.now() + Math.random()).toString(36),
      text: text.substring(0, REMINDER_TEXT_MAX_LENGTH),
    };
    this.reminders$.next([...this.reminders$.getValue(), newItem]);
  }

  public editReminder(data: Reminder) {
    const { text } = data;
    this.reminders$.next(
      this.reminders$.getValue().map((r) => (r.id === data.id ? { ...r, ...data, text: text.substring(0, REMINDER_TEXT_MAX_LENGTH) } : r)),
    );
  }

  public deleteReminder(reminderId: string): boolean {
    this.reminders$.next(this.reminders$.getValue().filter((r) => r.id !== reminderId));
    return true;
  }

  public getReminderColorMap(): ColorMap {
    return this.reminderColorMap;
  }

  public getReminders(): Observable<Reminder[]> {
    return this.reminders$.asObservable();
  }

  public getSelectedDate(): Observable<Date> {
    return this.selectedDate$.asObservable();
  }

  public prevMonth() {
    this.selectedDate$.next(subMonths(this.selectedDate$.getValue(), 1));
  }

  public nextMonth() {
    this.selectedDate$.next(addMonths(this.selectedDate$.getValue(), 1));
  }

  public today() {
    this.selectedDate$.next(new Date());
  }

  public getDayNamesOfWeek(): string[] {
    return this.dayNamesOfWeek;
  }

  public createCalendarDays = (): CalendarDay[] => {
    const selectedDate = this.selectedDate$.getValue();
    const year = getYear(selectedDate);
    const month = getMonth(selectedDate) + 1;
    const formattedToday = this.formatDate(new Date());
    const numberOfDayInMonth = getDaysInMonth(new Date(`${year}-${month}`));

    return [...Array(numberOfDayInMonth)].reduce((days: CalendarDay[], _, index) => {
      const dateObj = new Date(`${year}-${month}-${index + 1}`);
      const dayIndex = getDay(dateObj);

      // if 1st day of month is not Sunday, need to fill these gap days from previous month
      if (index === 0 && dayIndex !== FIRST_DAY_OF_WEEK_INDEX) {
        const prevDays = this.getAdditionalDays(subDays(dateObj, dayIndex), dayIndex);
        prevDays.forEach((d) => days.push(d));
      }

      const date = this.formatDate(dateObj);
      const weekend = this.isWeekend(dateObj);
      const reminders = this.getRemindersForDate(dateObj);
      days.push({ date, disabled: false, weekend, today: date === formattedToday, reminders });

      // if last day of month is not Saturday, need to fill these gap days from next month
      if (index === numberOfDayInMonth - 1 && dayIndex !== LAST_DAY_OF_WEEK_INDEX) {
        const nextDays = this.getAdditionalDays(addDays(dateObj, 1), LAST_DAY_OF_WEEK_INDEX - dayIndex);
        nextDays.forEach((d) => days.push(d));
      }

      return days;
    }, []);
  };

  private getAdditionalDays(date: Date, toIndex: number): CalendarDay[] {
    return [...Array(toIndex).keys()].reduce((days: CalendarDay[], d) => {
      const addedDate = addDays(date, d);
      const reminders = this.getRemindersForDate(addedDate);
      days.push({
        date: this.formatDate(addedDate),
        disabled: true,
        weekend: this.isWeekend(addedDate),
        reminders,
      });

      return days;
    }, []);
  }

  public formatDate(date: Date): string {
    return format(date, DATE_FORMAT);
  }

  private isWeekend(date: Date): boolean {
    return isWeekend(date);
    // return [FIRST_DAY_OF_WEEK_INDEX, LAST_DAY_OF_WEEK_INDEX].includes(date.day());
  }

  private getRemindersForDate(date: Date): Reminder[] {
    const formattedDate = this.formatDate(date);
    return this.reminders$.getValue().filter((r) => this.formatDate(new Date(r.dateTime)) === formattedDate);
  }
}

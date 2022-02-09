import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  pure: false
})
export class DateFormatterPipe implements PipeTransform {
  transform(writtenAt: Date): string {
    const now = new Date();
    const nowInMs = now.getTime();
    const writtenAtDate = new Date(writtenAt);
    const writtenAtInMs = writtenAtDate.getTime();

    const days = Math.floor((nowInMs - writtenAtInMs) / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (Math.abs(nowInMs - writtenAtInMs) / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (Math.abs(nowInMs - writtenAtInMs) / (1000 * 60)) % 60
    );
    // console.log(
    //   `[Difference] Days: ${days} | hours: ${hours} | minutes: ${minutes}`
    // );

    const notOlderThan60s = days === 0 && hours === 0 && minutes === 0;
    const notOlderThan10m = days === 0 && hours === 0 && minutes < 10;
    const olderThan10Minutes = !notOlderThan10m;
    const notToday =
      Math.abs(Math.floor(now.getDay() - writtenAtDate.getDay())) > 0;

    if (notOlderThan60s) return 'Just now';
    if (notOlderThan10m) return `${minutes} minutes ago`;
    if (notToday) {
      return (
        this.printWithLeadingZero(writtenAtDate.getDate().toString()) +
        '.' +
        this.printWithLeadingZero(writtenAtDate.getMonth().toString() + 1) +
        '.' +
        writtenAtDate.getFullYear() +
        ' ' +
        this.printWithLeadingZero(writtenAtDate.getHours().toString()) +
        ':' +
        this.printWithLeadingZero(writtenAtDate.getMinutes().toString())
      );
    }
    if (olderThan10Minutes)
      return (
        this.printWithLeadingZero(writtenAtDate.getHours().toString()) +
        ':' +
        this.printWithLeadingZero(writtenAtDate.getMinutes().toString())
      );

    return '';
  }

  printWithLeadingZero(str: string) {
    return ('0' + str).slice(-2);
  }
}

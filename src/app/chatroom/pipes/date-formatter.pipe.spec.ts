import { DateFormatterPipe } from './date-formatter.pipe';

describe('DateFormatterPipe', () => {
  let dateFormatterPipe: DateFormatterPipe;
  const s = 1000;
  const m = s * 60;
  const h = m * 60;

  beforeEach(() => {
    dateFormatterPipe = new DateFormatterPipe();
  });

  it('says "just now"', () => {
    const today = new Date();
    const writtenAt = new Date(today.getTime() - 10 * s); // - 10s
    expect(dateFormatterPipe.transform(writtenAt)).toBe('Just now');
  });

  it('says "4 minutes ago"', () => {
    const today = new Date();
    const writtenAt = new Date(today.getTime() - 4 * m); // - 4m
    expect(dateFormatterPipe.transform(writtenAt)).toBe('4 minutes ago');
  });

  it('says time in "mm:ss"', () => {
    const today = new Date();
    const writtenAt = new Date(today.getTime() - 2 * h - 54 * m); // - 2h 54m
    const hours =
      writtenAt.getHours() < 10
        ? '0' + writtenAt.getHours()
        : writtenAt.getHours();
    const minutes =
      writtenAt.getMinutes() < 10
        ? '0' + writtenAt.getMinutes()
        : writtenAt.getMinutes();
    expect(dateFormatterPipe.transform(writtenAt)).toBe(`${hours}:${minutes}`);
  });

  it('says "dd.mm.yyyy hh:mm"', () => {
    const longAgo = new Date(2022, 0, 4, 14, 5, 18);
    expect(dateFormatterPipe.transform(longAgo)).toBe('04.01.2022 14:05');
  });
});

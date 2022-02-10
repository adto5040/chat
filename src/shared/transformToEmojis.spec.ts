import { transformToEmojis } from './transformToEmojis';

describe('transformToEmojis', () => {
  it('should transform to emojis correctly', () => {
    expect(
      transformToEmojis(':) :o) ;) :( (y) :))) ::(((( ;;))) :::o))) :(y)(y)')
    ).toBe('🙂 🐵 😉 😟 👍 🙂)) :😟((( ;😉)) ::🐵)) 😟y)👍');
  });
});

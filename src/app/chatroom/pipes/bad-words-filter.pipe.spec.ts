import { BadWordsFilterPipe } from './bad-words-filter.pipe';

describe('BadWordsFilterPipe', () => {
  let badWordsFilterPipe: BadWordsFilterPipe;

  beforeEach(() => {
    badWordsFilterPipe = new BadWordsFilterPipe();
  });

  it('should filter bad words', () => {
    expect(badWordsFilterPipe.transform('Fuck you, you dick HEAD! Damn!')).toBe(
      '**** you, you *********! ****!'
    );
  });
});

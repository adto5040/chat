import { UserHighlightPipe } from './user-highlight.pipe';

describe('UserHighlightPipe', () => {
  let userHighlightPipe: UserHighlightPipe;

  beforeEach(() => {
    userHighlightPipe = new UserHighlightPipe();
  });

  it('should add bold tags around user', () => {
    expect(
      userHighlightPipe.transform(
        '@Hans: Hello @Peter, your Em@il is peter@i.com? Please contact @ @Ingrid'
      )
    ).toBe(
      '<b>@Hans</b>: Hello <b>@Peter</b>, your Em@il is peter@i.com? Please contact @ <b>@Ingrid</b>'
    );
  });
});

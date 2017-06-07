import { TexasHoldemWebPage } from './app.po';

describe('texas-holdem-web App', () => {
  let page: TexasHoldemWebPage;

  beforeEach(() => {
    page = new TexasHoldemWebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

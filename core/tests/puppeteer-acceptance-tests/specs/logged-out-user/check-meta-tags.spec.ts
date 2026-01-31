import {UserFactory} from '../../utilities/common/user-factory';
import testConstants from '../../utilities/common/test-constants';
import {LoggedOutUser} from '../../utilities/user/logged-out-user';

describe('Meta Tags Check', function () {
  let guestUser: LoggedOutUser;

  beforeAll(async function () {
    guestUser = await UserFactory.createLoggedOutUser();
  });

  it('should check meta title on Get Started page', async function () {
    await guestUser.page.goto(testConstants.URLs.GetStarted);

    const title = await guestUser.page.title();
    expect(title).toContain('Oppia');
  });

  afterAll(async function () {
    await UserFactory.closeAllBrowsers();
  });
});

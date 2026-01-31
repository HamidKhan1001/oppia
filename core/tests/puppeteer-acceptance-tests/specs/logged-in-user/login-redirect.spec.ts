// Copyright 2026 The Oppia Authors.
// Licensed under the Apache License, Version 2.0.

import {UserFactory} from '../../utilities/common/user-factory';
import testConstants from '../../utilities/common/test-constants';
import {LoggedInUser} from '../../utilities/user/logged-in-user';

const DEFAULT_SPEC_TIMEOUT = testConstants.DEFAULT_SPEC_TIMEOUT_MSECS;

describe('Login Redirect', function () {
  let loggedInUser: LoggedInUser;

  beforeAll(async function () {
    loggedInUser = await UserFactory.createLoggedInUser('navigation@test.com');
  }, DEFAULT_SPEC_TIMEOUT);

  it('should redirect logged-in users away from login page', async function () {
    await loggedInUser.page.goto(testConstants.URLs.Login);

    // Wait until user is redirected away from login page.
    await loggedInUser.page.waitForFunction(
      () => !window.location.href.includes('/login')
    );

    expect(await loggedInUser.page.url()).not.toContain('/login');
  });

  afterAll(async function () {
    await UserFactory.closeAllBrowsers();
  });
});

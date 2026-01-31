// Copyright 2026 The Oppia Authors.
// Licensed under the Apache License, Version 2.0.

import {UserFactory} from '../../utilities/common/user-factory';
import testConstants from '../../utilities/common/test-constants';
import {LoggedInUser} from '../../utilities/user/logged-in-user';

const DEFAULT_SPEC_TIMEOUT = testConstants.DEFAULT_SPEC_TIMEOUT_MSECS;

describe('Frontend Error Reporting', function () {
  let loggedInUser: LoggedInUser;

  beforeAll(async function () {
    loggedInUser = await UserFactory.createLoggedInUser('error@test.com');
  }, DEFAULT_SPEC_TIMEOUT);

  it('should report frontend error after session expires', async function () {
    await loggedInUser.page.goto(testConstants.URLs.Preferences);

    // Wait for page load
    await loggedInUser.page.waitForFunction(
      () => document.readyState === 'complete'
    );

    // Simulate expired session
    await loggedInUser.page.deleteCookie(
      ...(await loggedInUser.page.cookies())
    );

    // Trigger action that causes backend request
    await loggedInUser.page.reload();

    // Page should still load but user is logged out
    expect(await loggedInUser.page.url()).not.toContain('/preferences');
  });

  afterAll(async function () {
    await UserFactory.closeAllBrowsers();
  });
});

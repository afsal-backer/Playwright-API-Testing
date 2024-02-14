import { expect, test } from '@playwright/test';
import GitHubController from '../../../controller/github.controller';

const gitUsername = 'afsal-backer';
const gitRepoName = 'REPO';

test.beforeAll(async ()=>{
  await GitHubController.init();
  await GitHubController.createRepo({"name": gitRepoName});
})

test.afterAll(async ({ }) => {
  await GitHubController.dispose();
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Create issue using API and Validate it on the UI', () => {
  test('last created issue should be first in the list', async ({ page }) => {
    
    const response = await GitHubController.createIssue(gitUsername, gitRepoName, {"title": "BUG 1", "body": "Test Issue"})
    expect(response.status()).toBe(201);

    await page.goto(`${gitUsername}/${gitRepoName}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText('BUG 1');
  });
});

test.describe('Create issue on UI and Validate it using API', () => {
  test.only('last created issue should be on the server', async ({ page, context }) => {

    await page.goto(`${gitUsername}/${gitRepoName}/issues`);
    await page.pause();
    await page.getByText('New Issue').click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Bug report 1');
    await page.getByRole('textbox', { name: 'Comment body' }).fill('Bug description');
    await page.getByText('Submit new issue').click();
    const issueId = page.url().substr(page.url().lastIndexOf('/'));

    const newIssue = await GitHubController.getAnIssue(gitUsername, gitRepoName, issueId);
    expect(newIssue.ok()).toBeTruthy();
    expect(newIssue.json()).toEqual(expect.objectContaining({title: 'Bug report 1'}));
  });
});

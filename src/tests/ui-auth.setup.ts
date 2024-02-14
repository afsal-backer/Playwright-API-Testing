import { test as setup } from '@playwright/test';

const authFile = '.auth/ui-user.json';

setup('UI Authentication', async({page})=>{
    await page.goto('https://angular.realworld.how/');
    await page.getByText(' Sign in ').click();
    await page.locator('//input[@placeholder="Email"]').fill('conduitapi');
    await page.locator('//input[@placeholder="Password"]').fill('conduitapi');
    await page.locator('//button[text()=" Sign in "]').click();
    await page.locator('//a[@href="/profile/conduitapi"]').nth(0).waitFor();

    await page.context().storageState({path: authFile});
})
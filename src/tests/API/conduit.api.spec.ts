import { test, expect } from '@playwright/test';
import ConduitController from '../../../controller/conduit.controller';
import ConduitPage  from '../../pages/ConduitPage';


test.describe("Test Conduit Features using a combination of API and UI checks", ()=>{

    test.beforeAll(async ()=>{
        await ConduitController.init();
    });

    test("Login using API, Publish article using API and Validate it via UI", async({page})=>{
        
        const conduit = new ConduitPage(page);

        //Publish article via API
        const title = Math.random();
        const response =  await ConduitController.publishArticle(title);
        expect(response.article).toHaveProperty('title', `Title ${title}`);

        // Validate it via UI
        await page.goto("https://angular.realworld.how/");
        await conduit.openGlobalFeed();
        await expect(page.locator('//a[@class="preview-link"]//h1').nth(0)).toHaveText(`Title ${title}`);
    });
})
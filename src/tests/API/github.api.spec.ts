import { test, APIResponse, expect } from '@playwright/test';
import gitHubController from '../../../controller/github.controller';

test.describe("Testing GitHub Repository operations using APIs", ()=>{
    const gitUsername = 'afsal-backer';
    const gitRepoName = 'REPO';

    test.beforeAll(async ()=>{
        await gitHubController.init();
    })

    test.afterAll(async ({ }) => {
        await gitHubController.dispose();
    });

    test("Create a new repo", async()=>{
        const response = await gitHubController.createRepo({"name": gitRepoName})
        await expect(response.status()).toBe(201);
        await expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        await expect(responseBody['name']).toEqual(gitRepoName);
    })

    test("Create a new issue", async()=>{
        const response = await gitHubController.createIssue(gitUsername, gitRepoName, {"title": "BUG 1", "body": "Test Issue"})
        await expect(response.status()).toBe(201);
        const responseBody = await response.json();
        await expect(responseBody.user).toHaveProperty('login', 'afsal-backer')
    })

    test("Get an issue", async()=>{
        const response = await gitHubController.getAllIssues(gitUsername, gitRepoName)
        await expect(response.status()).toBe(200);
        const responseBody = await response.json();
        await expect(responseBody[0].title).toEqual('BUG 1');
        await expect(responseBody[1].body).toEqual('Test Issue');
    })

    test("Delete a repo", async()=>{
        const response = await gitHubController.deleteRepo(gitUsername, gitRepoName)
        await expect(response.status()).toBe(204);
    })
})
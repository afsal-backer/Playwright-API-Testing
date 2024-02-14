import { APIRequestContext, request } from "@playwright/test";

class GitHubController {

    private api: APIRequestContext;

    async init() {
        this.api = await request.newContext({
            baseURL: 'https://api.github.com/',
            extraHTTPHeaders: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
    }

    async dispose() {
        this.api.dispose();
    }

    async getAllIssues(userName: string, repoName: string){
        const response = await this.api.get(`repos/${userName}/${repoName}/issues`);
        return response;
    }

    async getAnIssue(userName: string, repoName: string, issueId: string){
        const response = await this.api.get(`repos/${userName}/${repoName}/issues/${issueId}`);
        return response;
    }
  
    async createRepo(requestBody: { name: string}) {
        const postResponse = await this.api.post("user/repos",{
            data: requestBody
        });
        return postResponse;
    }

    async createIssue(userName: string, repoName: string, requestBody: { title: string,  body: string}) {
        const postResponse = await this.api.post(`repos/${userName}/${repoName}/issues`,{
            data: requestBody
        });
        return postResponse;
    }

    async deleteRepo(userName: string, repoName: string) {
        const postResponse = await this.api.delete(`repos/${userName}/${repoName}`)
        return postResponse;
    }
}

export default new GitHubController();
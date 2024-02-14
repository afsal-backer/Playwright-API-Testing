import { APIRequestContext, request } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

class ConduitController {

    private api: APIRequestContext;

    async init(){
        this.api = await request.newContext({
            baseURL: 'https://api.realworld.io/api/'
        })
    }

    async login(){
        const email = process.env.CONDUIT_EMAIL;
        const password = process.env.CONDUIT_PASSWORD;

        const response = await this.api.post("users/login", {
            data:
                {
                    "user":
                        {
                            "email": email, 
                            "password": password
                        }
                }
        });

        const responseBody = await response.json();
        const token = await responseBody.user.token;
        return token;
    }

    async publishArticle(randomTitle: number) {
        const token =  await this.login();
        const response = await this.api.post("articles/", {
            data: {
                "article": {
                    title: `Title ${randomTitle}`,
                    description: `Sub ${randomTitle}`,
                    body: `Body ${randomTitle}`,
                    tagList: [`Tag ${randomTitle}`]
                }
            },
            headers: {
                "Authorization": `Token ${token}` 
            }
        });
        return response.json();
    }

}

export default new ConduitController();
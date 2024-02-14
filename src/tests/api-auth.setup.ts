import { test as setup } from '@playwright/test';
import ConduitController from '../../controller/conduit.controller';
import user from '../../.auth/api-user.json';
import fs from 'fs';

const authFile = '.auth/api-user.json';

setup('API Authentication', async({page})=>{
   
    await ConduitController.init();
    const token = await ConduitController.login();

    await page.context().storageState({path: authFile});
    user.origins[0].localStorage[0].value = token;
    fs.writeFileSync(authFile, JSON.stringify(user, null, 2))
})
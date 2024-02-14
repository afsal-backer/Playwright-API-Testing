import type {Page, Locator} from '@playwright/test'

class ConduitPage{

    readonly page: Page;
    readonly globalFeedTab : Locator;

    constructor (page: Page){
        this.page = page;
        this.globalFeedTab = page.getByText(' Global Feed ');
    }

    async openGlobalFeed(){
        await this.globalFeedTab.click();
    }
}

export default ConduitPage;
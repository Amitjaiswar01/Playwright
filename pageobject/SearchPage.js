//const { test, expect } = require('@playwright/test');

class SearchPage {
  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
  }

  async ApplyFilter(item) {
    await this.page.locator('.s-image-padding a:nth-child(1)').click();
    //await this.page.locator('#nav-search-submit-button').click();
  }

  async GetListofTitle(){
    let title = [];
    await this.page.waitForSelector('span.a-size-base-plus.a-color-base.a-text-normal');
    var listOfTitle = await this.page.$$('span.a-size-base-plus.a-color-base.a-text-normal')

    for (const data of listOfTitle) {
      const text = await data.textContent();
      title.push(text);
    }

    return title;
  }

  async SelectRandonItem(index){
    
    await this.page.waitForSelector('.a-link-normal.s-no-outline');
    var lisOfItems = await this.page.$$('.a-link-normal.s-no-outline');
    await lisOfItems[index].click();
  }

}

module.exports = SearchPage;
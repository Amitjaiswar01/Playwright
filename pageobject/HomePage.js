//const { Page } = require('@playwright');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async NavigateToAmazon() {
    await this.page.goto('https://www.amazon.in/');
  }

  async SearchTheItem(item) {
    await this.page.locator('#twotabsearchtextbox').fill(item);
    await this.page.locator('#nav-search-submit-button').click();
  }
}

module.exports = HomePage;
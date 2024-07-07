class CartPage {
    constructor(page, browser
    ) {
      this.page = page;
      this.browser = browser
    }
  
    async ClickOnATC(){
      await this.page.waitForSelector('input#add-to-cart-button');
      await this.page.locator('#add-to-cart-button').click();
    }

    async GetCartAmount()
    {
      await this.page.waitForSelector('#sw-atc-details-single-container');
      const dataPrice = await page.evaluate(() => { const element = document.querySelector('#sw-subtotal'); return element.getAttribute('data-price');
      });

      return dataPrice.replace('INR', '');
    }
  }
  
  module.exports = CartPage;
const { test, expect } = require('@playwright/test');
const HomePage = require('../pageobject/HomePage');
const SearchPage = require('../pageobject/SearchPage');
const Utils = require('../pageobject/CommonUtil');
const CartPage = require('../pageobject/CartPage');

test('Amazon Web Automation', async ({  page, browser }) => {
    const homePage = new HomePage(page);
    const search = new SearchPage(page, browser);
    const util = new Utils(page, browser);
    const cart = new CartPage(page, browser);

    // Launch browser and create a context
    //const browser = await chromium.launch({ headless: true });
    //context = await browser.newContext();
    //page = await context.newPage();

    // Navigate to Amazon website
    await homePage.NavigateToAmazon();

    // Search for "dress" on website
    await homePage.SearchTheItem('dress');
    var listOfTitle = await search.GetListofTitle();

    //Verify the Search Result item related to Dress
    for (const data of listOfTitle) {
      if (data.toLowerCase().includes('dress')) {
        console.log(('Search results page displays items related to "dress":', data));
      }

      //expect(data.toLowerCase()).toContain('dress')
    }

    // Click on any random product
    await search.SelectRandonItem(2);

    /* 
     Click on Add to Cart Button
     Get the amount of added product
    */
    await cart.ClickOnATC();  
    const cartAmt =  await cart.GetCartAmount();

    // Verify the product is added to cart
    await expect(cartAmt).toBeGreaterThan(0);
  });
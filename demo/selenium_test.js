const {
 Builder, By, until,
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const chromePath = require('chromedriver').path;

// const driver = chrome.Driver.createSession(new chrome.Options(),
//     new chrome.ServiceBuilder(chromePath).build());
const driver = new Builder().forBrowser('firefox').build();
async function example() {
        try {
                await driver.get('http://testing.coe.com:30022');
                const ele = await driver.findElement(By.xpath('(//*[contains(.,"Apple Juice")])[last()]'));
                await ele.click();

                // ===  wait
                const appleProduct = driver.wait(until.elementLocated(By.className('product__info__price')), 5000);
                // ===  wait
                const appleProductPrice = await appleProduct.getText();
                assert.equal(appleProductPrice.trim(), '€3.00');
                await driver.findElement(By.xpath('//button[contains(.,"Add to cart")]'))
                    .click();

                let numOfProduct = await new Promise((resolve, reject) => {
                        setTimeout(() => {
                                resolve(driver.findElement(By.xpath('//*[@class="navbar__brand__cart__icon"]/following-sibling::span'))
                                    .getText())
                        }, 500);
                });
                assert.equal(numOfProduct, '1');

                await driver.findElement(By.xpath('(//*[contains(., "Home")])[last()]'))
                    .click();
                await driver.findElement(By.xpath('(//*[contains(., "Banana Juice")])[last()]'))
                    .click();
                // ===  wait
                const productQuantity = driver.wait(until.elementLocated(By.id('id_quantity')), 5000)
                // ===  wait
                await productQuantity.clear();
                await productQuantity.sendKeys('5');

                await driver.findElement(By.xpath('//button[contains(.,"Add to cart")]'))
                    .click();
                numOfProduct = await new Promise((resolve, reject) => {
                        setTimeout(() => {
                                resolve(driver.findElement(By.xpath('//*[@class="navbar__brand__cart__icon"]/following-sibling::span'))
                                    .getText())
                        }, 500);
                });
                assert.equal(numOfProduct, '6');

                await driver.findElement(By.className('cart-label'))
                    .click();
                const cartItems = await driver.findElements(By.className('cart__line'));
                assert.equal(cartItems.length, 2);
        } finally {
                await driver.quit();
                console.timeEnd('selenium');
        }
}
console.time('selenium');
example();

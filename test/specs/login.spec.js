const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action')
const SharingAction = require('../actions/Sharing.action')
const {compareScreenshot} =requiere('../../utils/visual_regression_helper')

describe('Login', () => {
    let driver; 
    let loginAction;
    let sharingAction;

    beforeEach(async () => {
        driver = new Builder()
            .forBrowser('chrome')
            .build();

        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);
        await loginAction.openUrl('https://www.saucedemo.com/');
    })

    afterEach(async () => {
        await driver.quit();
    })

    it('Login with invalid credential', async () => {
        await loginAction.inputUsername('invaliduser');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await sharingAction.fullPageScreenshot('login invalid');
        await compareScreenshot (driver,'invalid_login');
    });

    it('Login with wrong password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('salah');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await sharingAction.fullPageScreenshot('login wrong password');
        await compareScreenshot (driver,'login_wrong_password');
    });

    it('Login with locked out user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');

        await sharingAction.fullPageScreenshot('user locked');
        await compareScreenshot (driver,'lockout_user');
    });
})
const {By} = require('selenium-webdriver');


class LoginPage{
        static inputUsername = By.id ('user-name');
        static inputPassword = By.id ('passwords');
        static buttonLogin = By.id ('login-button');
        static pageTitle = By.id ('title');
        static errorMessage = By.xpath ('//h3[@data-test="error"]');


}
    module.exports = LoginPage;
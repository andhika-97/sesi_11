const fs = require ('fs');

class SharingAction{
    constructor(driver){
        this.driver=driver;
    }
    async fullPagescreenshot(filename){
        const screenshot = await this.driver.takeScreenshot();
        fs.writeFileSync('screenshot'+ filename +'.png',screenshot,'base64');
    }
}
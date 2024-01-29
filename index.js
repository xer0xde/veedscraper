const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

(async function aufruf() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.veed.io/new?flow=%7B%22title%22%3A%22Auto+Subtitle+Generator+Online%22%2C%22flowId%22%3A%22subtitle%22%2C%22steps%22%3A%5B%7B%22type%22%3A%22new-upload%22%2C%22config%22%3A%7B%22noVideo%22%3Afalse%2C%22noAudio%22%3Afalse%2C%22noImage%22%3Atrue%2C%22noTranscript%22%3Afalse%7D%7D%2C%7B%22type%22%3A%22subtitle%22%2C%22config%22%3A%7B%7D%7D%2C%7B%22type%22%3A%22navigation%22%2C%22config%22%3A%7B%22tabHref%22%3A%22%2Fsubtitles%22%2C%22pingTestIds%22%3A%5B%22%40header-controls%2Fpublish-button%22%5D%2C%22pingType%22%3A%22shadow%22%2C%22uploadMediaPath%22%3Anull%2C%22dropdownId%22%3Anull%2C%22unselectElement%22%3Afalse%7D%7D%5D%7D&locale=en&source=%2Ftools%2Fauto-subtitle-generator-online');

        // Warte bis der Button mit dem XPath gefunden wird
        await driver.wait(until.elementLocated(By.xpath('//*[@id="onetrust-accept-btn-handler"]')), 10000);

        // Klicke auf den Button
        await driver.findElement(By.xpath('//*[@id="onetrust-accept-btn-handler"]')).click();

        // Warte auf das Feld für die Dateiauswahl mit einem allgemeineren XPath
        const fileInput = await driver.wait(
            until.elementLocated(By.xpath('//input[@type="file"]')),
            10000
        );

        // Sichtbares Element für Aktionen
        const visibleElement = await driver.findElement(By.xpath('//span[contains(text(), "Upload a File")]'));

        // Pfade zur MP4-Datei auf deinem System
        const mp4FilePath = path.resolve(__dirname, 'video.mp4');

        // Klicken Sie auf das sichtbare Element, um das unsichtbare Datei-Upload-Feld zu aktivieren
        await visibleElement.click();

        // Ziehe und lege die Datei auf das Feld
        await driver.actions().dragAndDrop(fileInput, { x: 0, y: 0 }).perform();

        // Datei auswählen und hochladen
        await fileInput.sendKeys(mp4FilePath);

    } finally {
        // Warte für 10 Sekunden, bevor der Browser geschlossen wird
        await driver.sleep(10000);
        await driver.quit();
    }
})();

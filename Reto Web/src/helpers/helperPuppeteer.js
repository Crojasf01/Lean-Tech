const performance = require('execution-time')

const waitForNetworkIdleCustom = async(page, timeout, required) => {

        let timeoutms = timeout * 1000;
        if (!required) required = false;
        const timeoutError = new Error('Timeout while waiting for network idle ' + timeoutms.toString());

        await new Promise((resolve, reject) => {
            let listener = (event) => {
                if (event.name == 'networkAlmostIdle') {
                    page._client.removeListener('Page.lifecycleEvent', listener);
                    resolve();
                }
            };

            page._client.on('Page.lifecycleEvent', listener);

            setTimeout(() => {
                page._client.removeListener('Page.lifecycleEvent', listener);
                if (required) {
                    reject(timeoutError);
                } else {
                    resolve();
                }
            }, timeoutms);
        });
    }
    //let codecept_helper = chelper;

class helperPuppeteer extends codecept_helper {
    async _wait(f, timeout, required, interval) {
        if (!interval) interval = 100;
        if (!timeout) timeout = 3;
        if (!required) required = true;
        timeout = timeout * 1000;
        let processing = false;
        return new Promise(
            async(done, reject) => {
                let waiterId;
                let elapsedTotal = 0;

                elapsedTotal = interval;
                let timer = performance();
                timer.start();
                let result = await f();
                let elapsed = timer.stop();
                elapsedTotal = elapsedTotal + elapsed.time
                if (result == true || elapsedTotal > timeout) {
                    done(true)
                } else {
                    waiterId = setInterval(
                        async() => {
                            if (processing != true) {
                                processing = true;
                                try {
                                    elapsedTotal = elapsedTotal + interval;
                                    let timer = performance();
                                    timer.start();
                                    let result = await f();
                                    let elapsed = timer.stop();
                                    elapsedTotal = elapsedTotal + elapsed.time
                                    if (result == true) {
                                        clearInterval(waiterId);
                                        done(true);
                                    }
                                    if (elapsedTotal >= timeout) {
                                        if (required) {
                                            clearInterval(waiterId);
                                            reject('Timeout')
                                        } else {
                                            clearInterval(waiterId);
                                            done(false)
                                        }
                                    }
                                    processing = false
                                } catch (exception) {
                                    console.log(exception)
                                    clearInterval(waiterId);
                                    done(false)
                                }
                            }
                        }, interval)
                }
            }
        )
    }

    async waitWhenVisible(selector, seconds, required) {
        await this._wait(async() => {
            let currentPage = this.helpers['Puppeteer'];
            let numVisible = await currentPage.grabNumberOfVisibleElements(selector);
            console.log('cantidad de elementos', numVisible);
            return (numVisible > 0) ? true : false;
        }, seconds, required)
    }

    async waitWhenInvisible(selector, seconds, required) {
        await this._wait(async() => {
            let currentPage = this.helpers['Puppeteer'];
            let numVisible = await currentPage.grabNumberOfVisibleElements(selector);
            return (numVisible == 0) ? true : false;
        }, seconds, required)
    }

    async waitForSelector(selector, seconds, ...options) {
        let currentPage = this.helpers['Puppeteer'].page;
        //await currentPage.waitForSelector(selector, seconds)
        await currentPage.waitForXPath(selector, { visible: true })
    }

    async waitNavigation(seconds) {
        let currentPage = this.helpers['Puppeteer'].page;
        currentPage.waitForNavigation(seconds)
    }

    async waitForNetworkIdle(seconds) {
        let currentPage = this.helpers['Puppeteer'].page;
        await waitForNetworkIdleCustom(currentPage, seconds)
    }

    async waitForNetworkIdle0() {
        let currentPage = this.helpers['Puppeteer'].page;
        currentPage.waitForNavigation({ waitUntil: "networkidle2" })
    }

    waitForAjaxTracer(request, timeout, required) {
        let currentPage = this.helpers['Puppeteer'].page;
        let countResponses = 0;

        let listen = true;

        let listener = async(event) => {
            try {
                let url = await event.url()
            } catch (exception) {
                if (required) {
                    done({})
                } else {
                    done({})
                }
            }
        }
        currentPage.on('response', listener)
    }

    async waitForAjaxAndClick(requests, timeout, ctx, dispatcher, content, required) {
        let currentPage = this.helpers['Puppeteer'].page;
        let countResponses = 0;
        await new Promise(
            async(done, reject) => {
                let listen = true;

                let listener = async(event) => {
                    try {
                        let url = await event.url()

                        for (let request of requests) {

                            if (url.toLowerCase().indexOf(request.toLowerCase()) > -1) {
                                countResponses++;
                            }

                        }
                        if ((Array.isArray(requests) && countResponses == requests.length) || (!Array.isArray(requests) && countResponses > 0)) {
                            currentPage.removeListener('response', listener, true)
                            listen = false;
                            done({ request: url, response: null })
                        }
                    } catch (exception) {
                        if (required) {
                            done({})
                        } else {
                            done({})
                        }
                    }
                }
                currentPage.on('response', listener)
                if (ctx) {
                    const element = await currentPage.$x(dispatcher, 60)
                    await element[0].click(dispatcher)
                }

                if (required == undefined) required = true;
                setTimeout(() => {
                    if (listen) {
                        currentPage.removeListener('response', listener, true);
                        if (required == true) {
                            reject('timeout ajax');
                        } else {
                            done()
                        }
                    }
                }, timeout * 1000);
            })
    }

    async waitForAjax(requests, timeout, required) {
        let currentPage = this.helpers['Puppeteer'].page;
        let countResponses = 0;
        await new Promise(
            async(done, reject) => {
                let listen = true;
                let listener = (event) => {
                    let url = event.url()
                    console.log('url', url);

                    for (let request of requests) {
                        if (url.toLowerCase().indexOf(request.toLowerCase()) > -1) {
                            countResponses++;
                            console.log('waitForAjax');
                        }
                    }

                    if ((Array.isArray(requests) && countResponses == requests.length) || (!Array.isArray(requests) && countResponses > 0)) {
                        currentPage.removeListener('response', listener, true)
                        listen = false;
                        done({ request: url, response: null })
                    }
                }

                currentPage.on('response', listener)

                if (required == undefined) required = true;
                setTimeout(() => {
                    if (listen) {
                        currentPage.removeListener('response', listener, true);
                        if (required == true) {
                            reject('timeout ajax');
                        } else {
                            done()
                        }
                    }
                }, timeout * 1000);
            })
    }
    async executeClick(locator) {
        let currentPage = this.codecept_helper['Puppeteer'];
        let selector = "";
        if (locator.xpath) selector = locator.xpath;
        if (locator.css) selector = locator.css;
        if (locator.id) selector = "#" + locator.id;
        if (locator.name) selector = locator.name;
        if (locator.link) selector = locator.link;
        if (locator.linkText) selector = locator.linkText;
        if (locator.partialLinkText) selector = locator.partialLinkText;
        if (locator.class) selector = locator.class;
        if (locator.cssSelector) selector = locator.cssSelector;
        let elemento = await currentPage.browser.$(selector);
        await currentPage.browser.execute((button) => { button.click() }, elemento);
    }

    async AjaxAndClick(locator, input) {
        await new Promise(
            async(done, reject) => {
                console.log('ingresara a current page');
                let currentPage = this.helpers['Puppeteer'].page;
                //  console.log('current page',currentPage); 
                let selector = "";


                //  const element = await currentPage.$x(dispatcher, 60)
                //   await element[0].click(dispatcher)

                const element = await currentPage.$x(locator)
                    //const element = await currentPage.$x(locator.xpath)  

                console.log('devuelve elemento1', element[0]);
                //console.log('devuelve elemento2',element[0].value); 
                //console.log('devuelve elemento3',element[0].target); 


                element[0].value == input;
                done();
            }
        )



    }


}


//EL FRAMEWORK PASA LOS IMPUTS DE LOS CARACTERSE MUY RAPIDO Y TERMINA NO DEVOLVIENDO NADA
//MANDAR TODA LA CADENA DEFRENTE A LA CASILLA, CON EL MISMO LOCATOR (SE OBTIENE EL ELEMENTO),  BUSCAR EL CONTROL DEL LOCATOR ,
//TENIENDO EL ELEMENTO, YA LE PUEDES PASAR LA PROPIEDAD Y EL VALOR QUE QUIERAS, ESO VA HACER QUE SETEES EL VALOR DIRECTAMENTE AL CONTROL

module.exports = helperPuppeteer;

//let Helper = codecept_helper;
/* 
class helperWebdriverIO extends Helper {
async executeClick(locator) {
   
  }

  async waitForSelector(selector, seconds, ...options)
  {
    let currentPage = this.helpers['WebDriver'];            
    currentPage.waitForXPath(selector, { visible: true });
  }  
}
*/
const steps = require("./src/features");

exports.config = {
    output: './report',
    helpers: {
        Puppeteer: {
            windowSize: "1850x1870",
            url: "https://www.saucedemo.com",
            waitForAction: 500,
            waitForNavigation: ["domcontentloaded", "networkidle0"],
            show: true
        },

        PuppeteerHelper: {
            require: "./src/helpers/helperPuppeteer.js",
            defaultHost: "https://www.saucedemo.com"

        },
        Mochawesome: {
            uniqueScreenshotNames: true
        }
    },
    include: {},
    mocha: {
        reporterOptions: {
            reportDir: "./report/",
            reportFilename: 'FileReport',
            reportTitle: 'LeanTech',
            autoOpen: true,
            ts: '',
        }
    },
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './src/features/**/**/*.feature',
        steps: [
            ...steps
        ]
    },
    plugins: {
        allure: {},
        screenshotOnFail: {
            enabled: true
        }
    },
    tests: './tests/*_test.js',
    name: 'LeanTech',
    multiple: {
        parallel: {
            chunks: 1
        }
    }


}

//console.log(module.exports.config)
const I = actor();
let retry = { retries: 3, minTimeout: 9000 };

module.exports = {
    // insert your locators 
    fields: {
        TxtFirstName : { xpath: '//*[@id="first-name"]' },
        TxtLastName : { xpath: '//*[@id="last-name"]' },        
        TxtZipcode : { xpath: '//*[@id="postal-code"]' } ,
        BtnContinue: { xpath: '//*[@id="continue"]' },
    },

    

}
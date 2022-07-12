const I = actor();
let retry = { retries: 3, minTimeout: 9000 };
let wait = { retries: 3, minTimeout: 9000 };


module.exports = {
    // insert your locators
    fields: {

        //LogIN
        MsjError : { xpath: '//*[@id="login_button_container"]/div/form/div[3]/h3' },
        TxtUsername : { xpath: '//*[@class="login-box"]//form//div[1]' },
        TxtPassword : { xpath: '//*[@class="login-box"]//form//div[2]' },
        BtnSignIn : { xpath: '//*[@class="submit-button btn_action"]' },

        //AddProduct : { xpath: '//*[@class="inventory_item_description"]//div[2]//button' },  
        AddProduct : { xpath: '//*[@id="add-to-cart-sauce-labs-backpack"]' },  
        BuscarR1: (row) => { return '//*[contains(text(),"' + row.toString() + '")]' },
        BuscarR2: (row) => { return '//*[contains(text(),"' + row.toString() + '")]' },
        PriceSauce : { xpath: '//*[@id="item_4_title_link"]/div' },  
        PriceTotal : { xpath: '//*[@class="btn btn_secondary back btn_medium cart_cancel_link"]' },  

        BtnFinish : { xpath: '//*[@class="btn btn_action btn_medium cart_button"]' },  
        ValidateThanks : { xpath: '//*[@class="complete-header"]' },  
        ValidateText : { xpath: '//*[@class="complete-text"]' },  

        //Product : { xpath: '//*[@id="item_4_title_link"]/div'} ,
        Cart : { xpath: '//*[@class="shopping_cart_link"]' },  
        Checkout : { xpath: '//*[@class="btn btn_action btn_medium checkout_button"]' },  
        YourInf : { xpath: '//*[@id="header_container"]/div[2]/span' },  

        TxtFirstName : { xpath: '//*[@id="first-name"]' },
        TxtLastName : { xpath: '//*[@id="last-name"]' },        
        TxtZipcode : { xpath: '//*[@id="postal-code"]' } ,
        BtnContinue: { xpath: '//*[@id="continue"]' },
          
    },


    //methods here
    async SignIN(Usuario, Password) 
    {
        console.log('Deseo abrir la siguiente pagina : ');
        I.retry(retry).amOnPage('https://www.saucedemo.com');
        I.retry(retry).click(this.fields.TxtUsername);
        I.retry(retry).appendField(this.fields.TxtUsername,Usuario);
        I.retry(retry).click(this.fields.TxtPassword);
        I.retry(retry).appendField(this.fields.TxtPassword,Password);
        I.retry(retry).click(this.fields.BtnSignIn);
    },

    async SignTwoOp(Usuario, Password) 
    {
        console.log('Deseo abrir la siguiente pagina : ');
        I.retry(retry).amOnPage('https://www.saucedemo.com');
        I.retry(retry).click(this.fields.TxtUsername);
        I.retry(retry).appendField(this.fields.TxtUsername,Usuario);
        I.retry(retry).click(this.fields.TxtPassword);
        I.retry(retry).appendField(this.fields.TxtPassword,Password);
        I.retry(retry).click(this.fields.BtnSignIn);
        I.retry(wait).seeElement(this.fields.MsjError);
        console.log('Valido el login con el ver el siguiente mensaje', this.fields.BtnSignIn);

    },
      async AddProduct(NameProduct) 
    {   
        I.wait(1);
        let row = NameProduct
        let Name1 = await I.grabTextFrom(this.fields.BuscarR1(row), NameProduct)  
        console.log('captura valor y compara', this.fields.BuscarR1(row), NameProduct);
        await I.retry(retry).click(this.fields.AddProduct);
        I.wait(1);
        await I.retry(retry).click(this.fields.Cart);
        if (Name1 == NameProduct)    
        {
            await I.retry(wait).click(this.fields.Checkout);
            console.log('Click en checkout',this.fields.Checkout);                 
            I.wait(2);
            I.seeElement(this.fields.YourInf);
            console.log('Veo el texto Sauce Labs Backpack',this.fields.YourInf);                 
        }
    },

    async Checkout(FirtName,LastName,ZipCode) 
    {
        I.wait(1);
        I.retry(retry).click(this.fields.TxtFirstName);
        I.retry(retry).appendField(this.fields.TxtFirstName,FirtName);
        I.retry(retry).click(this.fields.TxtLastName);
        I.retry(retry).appendField(this.fields.TxtLastName,LastName);
        I.retry(retry).click(this.fields.TxtZipcode);
        I.retry(retry).appendField(this.fields.TxtZipcode,ZipCode);
        I.retry(retry).click(this.fields.BtnContinue);
        
    },

    async OverVIew(ValidateName) 
    {   
        I.wait(1);
        let row2 = ValidateName
        let Name2 = await I.grabTextFrom(this.fields.BuscarR2(row2), ValidateName)  
        console.log('Valido el nombre en el checkOut y comparo', this.fields.BuscarR2(row2), ValidateName);
        I.wait(1);
        if (Name2 == ValidateName)    
        {
            await I.retry(wait).seeElement(this.fields.PriceSauce);
            console.log('Valido el valor del precio en checkout',this.fields.PriceSauce);                 
            I.wait(2);
            await I.retry(wait).seeElement(this.fields.PriceTotal);
            console.log('Valido el valor total de la compra en checkout',this.fields.PriceTotal);                 
            await I.retry(wait).click(this.fields.BtnFinish);
            I.wait(2);
            await I.retry(wait).waitForElement(this.fields.ValidateThanks,5);
            console.log('Valido que se muestra el mensaje Thanks',this.fields.ValidateThanks);                 
            await I.retry(wait).seeElement(this.fields.ValidateText);
            console.log('Valido que se muestra el mensaje : "CHECKOUT: COMPLETE!"',this.fields.ValidateText);                 

        }
    },


}



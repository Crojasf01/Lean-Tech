const Login = require("../../page-objects/InicioSesion");
const Menuproyectos = require("../../page-objects/Menuproyectos");

//Steps Flujo completo
Given('I access the page and log in with my user name {string} and Password {string}', async function(Usuario,Password) {
    Login.SignIN(Usuario,Password);
});

//Steps Validacion de Login
Given('I open the page and validate {string} and Password {string}', async function(Usuario,Password) {
    Login.SignTwoOp(Usuario,Password);
});

Given('I add a product to the shopping cart {string}', async function(NameProduct) {
    await Login.AddProduct(NameProduct);
});
 
Given('I enter my data to review the checkout, fill First Name {string} Last Name {string} and my code Zip {string}', async function(FirtName,LastName,ZipCode) {
    await Login.Checkout(FirtName,LastName,ZipCode);
});

Given('I want to validate that the selected values are the same {string}', async function(ValidateName) {
    await Login.OverVIew(ValidateName);
});
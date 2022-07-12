const map = {
        Selectors: {
            //Contains: (text, elementType) => { return `//${elementType}[contains(text(),'${text}')]`; }
            Contains: (text, elementType) => {
                //return `//div[contains(@class,'x-boundlist-floating') and not(contains(@style, 'display: none'))][descendant::${elementType}[contains(text(),'${text}')]]`; 
                return `//${elementType}[contains(text(),'${text}')]`;
            }
        },
        Navigation: {
            waitTimeRender: 10,
            waitTimePost: 30
        },
        Login: {
            Url: '/',
            Username: '//*[@id="login"]',
            Password: '//*[@id="password"]',
            ButtonSignIn: '//*[@id="login-button"]',
        },
        DialogBox: {},
        Main: {
            Head: (title) => { return '/html/body/app-root/app-home/app-project-list/div/div[1]/h3/font/font' },
            Menu: {
                ComboMarca: '//*[@id="brand"]/div/label',
                ComboCategoria: '//*[@id="categoria"]/div/label',
                ComboTipodeproyecto: '//*[@id="tipoproyecto"]/div/label',
                ComboAniodelanzamiento: '//*[@id="aniolanzamiento"]/div/label',


            }
        }
    },

},


module.exports = map;
const map =
{
  Selectors:
  {
    Contains: (text, elementType) => { return `${elementType}:contains('${text}')`; }
  },
  Navigation:
  {
    waitTimeRender: 5,
    waitTimePost: 10
  },  
  Login: 
  {
    Url: '/',
    Username: { id:'txtUsuario' },
    Password: { id:'txtContrasena' },
    ButtonSignIn: { id:'imgIngresar' },
  },
  DialogBox:
  {
    AlertContent: '.x-window-body, .x-layout-fit',
    SelectorContent: '.x-boundlist-floating',
    Notification: { xpath: "//span[contains(text(),'Mensaje Notificacion')]" }
    //Notification: {xpath: "//input[@type='submit'][contains(@value, 'foo')]"}"span:contains('Mensaje Notificacion')"
  },
  Main: 
  {
    Greeting: { id:'layerNombreUsuario' },
    Head: { id:'Cabecera' },
    Menu: {
      Name: { id:'divMenu' },
      ButtonExpandir: '#spanExpandir',
      ComboCanal: '#slcCanalMenu',
      ComboRegion: '#slcRegionMenu',
      ComboMarca: '#slcMarcaMenu',
      ComboAnio: '#slcAnioMenu',
      ComboEtapa: '#slcEtapaMenu',
      OptionMatriz: 
      {
        Name: '//*[@id="divMenu"]/ul/li[1]',
        Options: 
        {
          Matriz: '//*[@id="divMenu"]/ul/li[1]/div/ul/li[1]/span/a'
        }
      },      
      OptionMatriz2: 
      {
        Name: "#divMenu>ul>li:contains('Matriz')",
        Options: 
        {
          Matriz: "#divMenu>ul>li:contains('Matriz')>div>ul>li:contains('Matriz')/span/a"
        }
      }
    },
    Parameters: 
    {
      ComboVista: '#divComboVista',
      ComboMarca: '#divComboMarca',
      ComboVinculaciones: '#divComboVinculaciones',
      ComboCampania: '#divComboCampania',
      ButtonProcesar: '#imgProcesar'
    }
  },
  OfertaMultiple: 
  {
    ButtonGuardar: '#lnkGuardarPanel',
    ButtonCerrar: '#btnCerrar'
  },
  PromocionSet: 
  {
    ButtonGuardar: '#lnkGuardarPanel',
    ButtonCerrar: '#btnCerrar'
  }
}

module.exports = map;
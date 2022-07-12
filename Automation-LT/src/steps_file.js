'use strict';

const Configuration = require('./selectors/xpath')

module.exports = function() 
{
//hola
  return actor(
  {
    async waitMaximizarWindow()
    {
      await this.wait(1)
      await this.waitMaximizarWindows("1850x1270");
    },

    async whenVisible(selector, ...options)
    {
      await this.waitForElement(selector, 620)
      const numVisible = await this.grabNumberOfVisibleElements(selector);
      return (numVisible > 0) ? true: false;
    },

    async focusClick(selector, ...options)
    {
      let timeout = 60
      await this.scrollTo(selector)
      await this.click(selector)
    },

    async whenVisibleClick(selector, ...options)
    {
      let timeout = 6000
      await this.waitWhenVisible(selector, timeout)
      await this.click(selector);
    },

    async selectFirstItem()
    {
      await this.wait(1)
      await this.pressKey('ArrowDown')
      await this.pressKey('Enter')
    },

    async whenVisibleDoubleClick(selector,...options)
    {
      let timeout = 6000
      await this.waitWhenVisible(selector, timeout);
      await this.scrollTo(selector)
      await this.doubleClick(selector);
    },
    
    async whenVisibleSelectValue(selector, value, elementType)
    {
      if (!elementType) elementType = 'li'
      let elementValue = Configuration.Selectors.Contains(value, elementType);
      await this.waitForElement(elementValue, 60)
      await this.click(elementValue)
    },  
   
      async waitFillField(selector, value, methods)
    {
      await this.waitForElement(selector, 60)
      await this.waitForAjaxAndClick(methods, 30, this, selector)
    },        

    async waitWhenVisibleClick(selector, methods)
    {
      await this.waitForElement(selector, 60)
      await this.waitForAjaxAndClick(methods, 30, this, selector)
    },    

    async waitWhenVisibleSelectValue(selector, value, method, elementType)
    {
      if (!elementType) elementType = 'li'
      let elementValue = Configuration.Selectors.Contains(value, elementType);
      await this.waitWhenVisible(elementValue, 60)
      await this.waitForAjaxAndClick(method, 30, this, elementValue, selector)
    },
 
    async waitSeeText(text, elementType,...options)
    {
      if (!elementType) elementType = 'div'
      let selector = Configuration.Selectors.Contains(text, elementType);      
      await this.waitWhenVisible(selector, 60, true);
    },

    async waitSeeElement(selector, ...options)
    {
      await this.waitForElement(selector, 60);
      await this.see(selector);
    },  
    
    async waitSeeTextIn(selectorContainer, text)
    {
      await this.waitForSelector(selectorContainer, 60)
      await this.see(selectorContainer);
    }

  });

}


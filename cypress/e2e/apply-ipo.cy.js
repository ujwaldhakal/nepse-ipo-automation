const { share } = require("rxjs");

describe('Login Test', () => {
    it('Should apply IPO ', () => {
      // Visit the login page
    
      let baseUrl = Cypress.env('app_url')

      cy.visit(baseUrl+'#/login');
      cy.get('.serarchable-dropdown').click().type(Cypress.env('login_bank_name'));
      cy.get('.select2-results__option--highlighted').click()
      cy.get('#username').type(Cypress.env('login_bank_username'));
      cy.get('#password').type(Cypress.env('login_bank_password'));
      cy.get('.sign-in').click();
      cy.wait(1000)
      cy.window().then( win => {
        cy.visit(baseUrl+'#/asba');
        cy.wait(2000)
        cy.get('.company-list').each(($el, index, $list) => {
          applyIpo($el) // apply multiple ipo in a loop
        })
    })
    });
  });


  function applyIpo(el) 
  {
    let shareType = el.find('.isin').text().replace(/ /g,'').replace(/(\r\n|\n|\r)/gm, "");
    if(shareType == 'OrdinaryShares') 
    {
      
      let applyButton = el.find('.btn-issue:contains("Apply")');
      
        if(applyButton.length ==0 ) {
        console.log("share already applied for ",el.find('.company-name').text())
        return;
        }
        el.find('.btn-issue:contains("Apply")').click(); // apply
        cy.wait(1000);
        cy.get('#selectBank').select(Cypress.env('bank_name_to_apply_ipo')); 
        cy.get('#appliedKitta').type(Cypress.env('number_of_kitta'))
        cy.get('#crnNumber').type(Cypress.env('crn'))
        cy.get('#disclaimer').click()
        cy.get('.card-footer > .btn-primary').click()
        cy.get('#transactionPIN').type(Cypress.env('transaction_pin'))
        cy.get('.confirm-page-btn > .btn-primary').click()
    }
  }
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

const LOGIN_URL = '/login';
const LOGIN_SELECTOR = '#exampleInputEmail1';
const PASSWORD_SELECTOR = '#exampleInputPassword1';
const SUBMIT_SELECTOR = 'button[type="submit"]';

Given('не заполнено поле логина', () => {
  cy.visit(LOGIN_URL);
});

When('поле логина пустое', () => {
  cy.get(LOGIN_SELECTOR);
});

Then('кнопка входа остается неактивной', () => {
  cy.get(SUBMIT_SELECTOR).should('be.disabled');
});

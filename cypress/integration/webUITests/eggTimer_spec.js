/// <reference types="cypress" />

import urls from '../../fixtures/urls/urls.json'

describe('egg timer functionality', () => {

    beforeEach(() => {
        cy.visit(urls.webUrl)
        cy.viewport(1280, 1000);
        cy.setCookie('cookieConsent', '1')
    })

    it('should verify the timer if user sets the time manually in minutes', () => {
        cy.title().should('contain', 'e.ggtimer')
        cy.get('#EggTimer-start-time-input-text').type('15 minutes')
        cy.get('.validTime').click()
        cy.url().should('be.equal', 'https://e.ggtimer.com/15%20minutes')
        cy.get('.EggTimer-timer-bar-back').click()
    })

    it('should verify the timer if user selects predefined timers successfully', () => {
        cy.contains('/Pomodoro').click()
        cy.get('.EggTimer-timer-bar-back').click()
    })

    it('should change settings from Help and settings section ', () => {
        cy.contains('Help and Settings').click()
        //select digital theme from settings
        cy.get('#theme-select').eq(0).select('Digital').should('have.value', 'gg_timer_digital')
        //change alert sound volume (default volume - 100)
        cy.get('#volume').invoke('val', '50').trigger('change')
        //disable notification sound
        cy.contains('Enabled')
        cy.get('.slider.round').eq(1).click({ force: true })
        cy.contains('Disabled')
        cy.get('.EggTimer-settings-close').click({ force: true })
    })









})



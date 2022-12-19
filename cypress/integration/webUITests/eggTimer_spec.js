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

    it('should verify if user can add label to the timer via url', () => {
        cy.url().then(urlValue => cy.visit(urlValue + 'We will go live!/in/5minutes'))
        cy.get('.ClassicTimer-label').should('have.text', 'We will go live!')
    })

    it('should verify the timer when user enters large integer values', () => {
        cy.get('#EggTimer-start-time-input-text').type('57575775757575757575677575757')
        cy.get('.validTime').click()
        cy.contains('NaN')
    })

    it('should verify if the user is able to toggle the toolbar', () => {
        cy.contains('/Morning').click()
        cy.url().should('be.equal', 'https://e.ggtimer.com/morning')
        cy.get('.EggTimer-timer-bar-toggle-collapse').click()
    })

    it('should verify if the user is able to perform actions on toolbar', () => {
        cy.url().then(urlValue => cy.visit(urlValue + '120'))
        cy.get('#theme-select').eq(0).select('Dot Matrix').should('have.value', 'gg_timer_dotmatrix')
        cy.get('.UI-toggle-switch-off').eq(1).click({ force: true })
        cy.get('.EggTimer-timer-bar-help').click()
        cy.get('.EggTimer-settings-close').click({ force: true })
        cy.get('[title="Restart timer"]').click()
        cy.get('.EggTimer-timer-bar-back').click()
    })

    it('should verify the alert when time expires', () => {
        cy.get('#EggTimer-start-time-input-text').type('10')
        cy.get('.validTime').click()
        //enable notification from toolbar
        cy.get('.UI-toggle-switch-on.selected').eq(0).click({ foce: true })
        cy.wait(10000)
        //verify alert
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Time Expired!');
        })
    })

})



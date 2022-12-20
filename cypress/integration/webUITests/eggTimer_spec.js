/// <reference types="cypress" />

import urls from '../../fixtures/urls/urls.json'
import HomePage from '../../page_objects/HomePage'

const homePage = new HomePage()

describe('egg timer functionality', () => {

    beforeEach(() => {
        cy.visit(urls.webUrl)
        cy.viewport(1280, 1000);
        cy.setCookie('cookieConsent', '1')
    })

    it('should verify the timer if user sets the time manually in minutes', () => {
        homePage.getHomePageTitle().should('contain', 'e.ggtimer')
        homePage.getInputField().type('15minutes')
        homePage.getStartBtn().click()
        homePage.verifyRedirectedUrl().should('be.equal', 'https://e.ggtimer.com/15minutes')
        homePage.getTimerBackBtn().click()
    })

    it('should verify the timer if user selects predefined timers successfully', () => {
        homePage.getPredefinedTimerPomodoro().click()
        homePage.getTimerBackBtn().click()
    })

    it('should change settings from Help and settings section ', () => {
        homePage.getHelpAndSettingsBtn().click()
        //select digital theme from settings
        homePage.selectTheme().eq(0).select('Digital').should('have.value', 'gg_timer_digital')
        //change alert sound volume (default volume - 100)
        homePage.changeVolumeSettings().trigger('change')
        //disable notification sound
        homePage.getEnabledText()
        homePage.getVolumeSlider().eq(1).click({ force: true })
        homePage.getDisabledText()
        homePage.getHelpAndSettingsCloseBtn().click({ force: true })
    })

    it('should verify if user can add label to the timer via url', () => {
        homePage.verifyRedirectedUrl().then(urlValue => cy.visit(urlValue + 'We will go live!/in/5minutes'))
        homePage.verifyTimerText().should('have.text', 'We will go live!')
    })

    it('should verify the timer when user enters large values', () => {
        homePage.getInputField().type('57575775757575757575677575757')
        homePage.getStartBtn().click()
        homePage.verifyInvalidValidationTxt()
    })

    it('should verify if the user is able to toggle the toolbar', () => {
        homePage.getPredefinedTimerMorning().click()
        homePage.verifyRedirectedUrl().should('be.equal', 'https://e.ggtimer.com/morning')
        homePage.getToolBarBtn().click()
    })

    it('should verify if the user is able to perform actions on toolbar', () => {
        //adding time through url
        homePage.verifyRedirectedUrl().then(urlValue => cy.visit(urlValue + '120'))
        homePage.getThemeClass().should('have.class', 'ClassicTimer')
        homePage.selectTheme().eq(0).select('Dot Matrix').should('have.value', 'gg_timer_dotmatrix')
        // Theme should be changed to DotMatrix
        homePage.getThemeClass().should('have.class', 'DotMatrixTimer')
        homePage.getVolumeOffBtnToolBar().eq(1).click({ force: true })
        homePage.getHelpBtnToolBar().click()
        homePage.getHelpAndSettingsCloseBtn().click({ force: true })
        homePage.getRestartTimerBtn().click()
        homePage.getTimerBackBtn().click()
    })

    it('should verify the alert when time expires', () => {
        homePage.getInputField().type('10')
        homePage.getStartBtn().click()
        //enable notification from toolbar
        homePage.getEnableNotificationBtn().eq(0).click({ foce: true })
        cy.wait(10000)
        //verify alert popup
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Time Expired!');
        })
    })

})



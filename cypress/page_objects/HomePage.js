
class HomePage {

    getHomePageTitle() {
        return cy.title()
    }

    getInputField() {
        return cy.get('#EggTimer-start-time-input-text')
    }

    getStartBtn() {
        return cy.get('.validTime')
    }

    verifyRedirectedUrl() {
        return cy.url()
    }

    getTimerBackBtn() {
        return cy.get('.EggTimer-timer-bar-back')
    }

    getPredefinedTimerPomodoro() {
        return cy.contains('/Pomodoro')
    }

    getHelpAndSettingsBtn() {
        return cy.contains('Help and Settings')
    }

    selectTheme() {
        return cy.get('#theme-select')
    }

    changeVolumeSettings() {
        return cy.get('#volume').invoke('val', '50')
    }

    getEnabledText() {
        return cy.contains('Enabled')
    }

    getVolumeSlider() {
        return cy.get('.slider.round')
    }

    getDisabledText() {
        return cy.contains('Disabled')
    }

    getHelpAndSettingsCloseBtn() {
        return cy.get('.EggTimer-settings-close')
    }

    verifyTimerText() {
        return cy.get('.ClassicTimer-label')
    }

    verifyInvalidValidationTxt() {
        return cy.contains('NaN')
    }

    getPredefinedTimerMorning() {
        return cy.contains('/Morning')
    }

    getToolBarBtn() {
        return cy.get('.EggTimer-timer-bar-toggle-collapse')
    }

    getVolumeOffBtnToolBar() {
        return cy.get('.UI-toggle-switch-off')
    }

    getHelpBtnToolBar() {
        return cy.get('.EggTimer-timer-bar-help')
    }

    getRestartTimerBtn() {
        return cy.get('[title="Restart timer"]')
    }

    getTimerBackBtn() {
        return cy.get('.EggTimer-timer-bar-back')
    }

    getEnableNotificationBtn() {
        return cy.get('.UI-toggle-switch-on.selected')
    }

}

export default HomePage
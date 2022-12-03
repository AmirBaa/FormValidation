/// <reference types="cypress" />
// import { data } from 'cypress/types/jquery'
import loginForm from './pageObjects/loginForm'

describe('End to end testing of Form Validation', () => {
    let LoginForm
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
        LoginForm = new loginForm()
    })
    let FormData
    let InvalidData
    before(function () {
        cy.fixture('loginInfo').then((data) => {
            FormData = data.valid
            InvalidData = data.invalidEmail
        })
    })

    it('shows success message after valid registration', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.phoneNumber().type(FormData.phone)
        LoginForm.email().type(FormData.email)
        LoginForm.websiteURL().type(FormData.website)
        LoginForm.password().type(FormData.password)
        LoginForm.passwordConfirm().type(FormData.passwordConfirm)
        cy.get('button').click()
        cy.get('.message-container').contains('Successfully registered, congratulations !')
    })
    it('shows red borders when fields are empty', () => {

        LoginForm.fullName().should('have.css', 'borderColor', 'rgb(255, 0, 0)')
        LoginForm.phoneNumber().should('have.css', 'borderColor', 'rgb(255, 0, 0)')
        LoginForm.email().should('have.css', 'borderColor', 'rgb(255, 0, 0)')
        LoginForm.websiteURL().should('have.css', 'borderColor', 'rgb(255, 0, 0)')
        LoginForm.password().should('have.css', 'borderColor', 'rgb(255, 0, 0)')
        LoginForm.passwordConfirm().should('have.css', 'borderColor', 'rgb(255, 0, 0)')
    })
    it('shows green borders when valid input', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.fullName().should('have.css', 'borderColor', 'rgb(0, 128, 0)')

        LoginForm.phoneNumber().type(FormData.phone)
        LoginForm.phoneNumber().should('have.css', 'borderColor', 'rgb(0, 128, 0)')

        LoginForm.email().type(FormData.email)
        LoginForm.email().should('have.css', 'borderColor', 'rgb(0, 128, 0)')

        LoginForm.websiteURL().type(FormData.website)
        LoginForm.websiteURL().should('have.css', 'borderColor', 'rgb(0, 128, 0)')

        LoginForm.password().type(FormData.password)
        LoginForm.password().should('have.css', 'borderColor', 'rgb(0, 128, 0)')

        LoginForm.passwordConfirm().type(FormData.passwordConfirm)
        LoginForm.passwordConfirm().should('have.css', 'borderColor', 'rgb(0, 128, 0)')

        cy.get('button').click()
        cy.get('.message-container').should('have.css', 'borderColor', 'rgb(0, 128, 0)')
    })
    it('shows fail message after invalid Full name', () => {
        cy.get('button').click()
        cy.get('#name:invalid').invoke('prop', 'validationMessage').should('contain', 'Please fill in this field')

    })
    it('shows fail message after invalid Phone Number', () => {
        LoginForm.fullName().type(FormData.name)
        cy.get('button').click()
        LoginForm.phoneNumber().type('123')
        cy.get('#phone:invalid').invoke('prop', 'validationMessage').should('contain', 'Please match the format requested')
    })
    it('shows fail message after invalid Email address', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.phoneNumber().type(FormData.phone)
        cy.get('button').click()
        LoginForm.email().type(InvalidData.email)
        cy.get('#email:invalid').invoke('prop', 'validationMessage').should('contain', "Please include an '@' in the email address")
    })
    it('shows fail message after invalid Website URL', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.phoneNumber().type(FormData.phone)
        LoginForm.email().type(FormData.email)
        LoginForm.websiteURL().type('googlecom')
        cy.get('button').click()
        cy.get('#website:invalid').invoke('prop', 'validationMessage').should('contain', "Please enter a URL.")

    })
    it('shows fail message after invalid First Password', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.phoneNumber().type(FormData.phone)
        LoginForm.email().type(FormData.email)
        LoginForm.websiteURL().type(FormData.website)
        LoginForm.password().type('amir11')
        cy.get('button').click()
        cy.get('#password1:invalid').invoke('prop', 'validationMessage').should('contain', "Please match the format requested.")
    })
    it('shows fail message after invalid Second Password', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.phoneNumber().type(FormData.phone)
        LoginForm.email().type(FormData.email)
        LoginForm.websiteURL().type(FormData.website)
        LoginForm.password().type(FormData.password)
        LoginForm.passwordConfirm().type('amir11')
        cy.get('button').click()
        cy.get('#password2:invalid').invoke('prop', 'validationMessage').should('contain', "Please match the format requested.")
    })
    it('shows fail message in container if passwords do not match', () => {
        LoginForm.fullName().type(FormData.name)
        LoginForm.phoneNumber().type(FormData.phone)
        LoginForm.email().type(FormData.email)
        LoginForm.websiteURL().type(FormData.website)
        LoginForm.password().type(FormData.password)
        LoginForm.passwordConfirm().type('Bala1234567')
        cy.get('button').click()
        cy.get('.message-container').should('contain', 'Make sure passwords match')

    })
})
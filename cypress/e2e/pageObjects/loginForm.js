class loginForm {
    fullName() {
        return cy.get('#name')
    }
    phoneNumber() {
        return cy.get('#phone')
    }
    email() {
        return cy.get('#email')
    }
    websiteURL() {
        return cy.get('#website')
    }
    password() {
        return cy.get('#password1')
    }
    passwordConfirm() {
        return cy.get('#password2')
    }
}

export default loginForm
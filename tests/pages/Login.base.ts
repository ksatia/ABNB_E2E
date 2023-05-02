const BasePage = require('./Base.page')
class CheckoutPage extends BasePage {
    constructor(page) {
        super(page)

        //locators for first name, last name, street address, email, phone number, 
        this.firstName = 'First Name'
        this.lastName = 'Last Name'
        this.streetAddress = 'Street Address'
        this.email = 'Email'
        this.phoneNumber = 'Phone Number'
    }
    // await successModal.isVisible()

    async enterFirstName() {
        await this.page.getByRole('textbox', { name: this.firstName }).fill('Karan')
    }

    async enterLastName() {
        await this.page.getByRole('textbox', { name: this.lastName }).fill('Test')
    }

    async enterAddress() {
        await this.page.getByRole('textbox', { name: this.streetAddress }).fill('108 Steuben Street')
          await this.page.getByText('108 Steuben Street').first().click();
    }

    async enterEmail() {
        await this.page.getByRole('textbox', { name: this.email }).fill('test@test.com')
    }

    async enterPhoneNumber() {
        await this.page.getByRole('textbox', { name: this.phoneNumber }).fill('212 996 1970')
    }

    async saveInfoAndContinue() {
        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
    }

    async acceptProposedAdress() {
        await this.page.getByRole('button', { name: 'Use Proposed Address' }).click();
    }



}

module.exports = CheckoutPage

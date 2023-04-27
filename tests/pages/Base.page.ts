class BasePage {
    constructor (page) {
        this.page = page
    }

    async navigate(path) {
        await this.page.goto(`https://www.gamestop.com/${path}`)
    }
}

module.exports = BasePage
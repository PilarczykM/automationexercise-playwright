import type { Page } from "playwright/test";

export class Navigation {
	constructor(private readonly page: Page) {}

	get selector() {
		return {
			deleteAccountLink: this.page.getByRole("link", { name: "Delete Account" }),
			homeIcon: this.page.getByRole("link", { name: "Website for practice" }),
			homeLink: this.page.getByRole("link", { name: "Home" }),
			loggedAsInfo: this.page.getByText("Logged in as"),
			logoutLink: this.page.getByRole("link", { name: "Logout" }),
			productsLink: this.page.getByRole("link", { name: "Products" }),
			signupLoginLink: this.page.getByRole("link", { name: "Signup / Login" }),
		};
	}

	navigateTo = async (locator: keyof typeof this.selector) => {
		await this.selector[locator].click();
	};
}

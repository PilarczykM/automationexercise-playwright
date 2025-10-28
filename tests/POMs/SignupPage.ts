import type { Page } from "@playwright/test";

export class SignupPage {
	constructor(readonly page: Page) {}

	get selectors() {
		return {
			accountInformationHeading: this.page.getByText("Enter Account Information"),
		};
	}

	async fillAddressInformation(userData: {
		firstName: string;
		lastName: string;
		company?: string;
		address: string;
		address2?: string;
		country: "India" | "Canada" | "United States" | "Australia" | "Israel" | "New Zealand" | "Singapore";
		state: string;
		city: string;
		zipcode: string;
		mobileNumber: string;
	}) {
		await this.page.getByRole("textbox", { name: "First name" }).fill(userData.firstName);
		await this.page.getByRole("textbox", { name: "Last name" }).fill(userData.lastName);
		userData.company && (await this.page.getByRole("textbox", { exact: true, name: "Company" }).fill(userData.company));
		await this.page.getByRole("textbox", { name: "Address *" }).fill(userData.address);
		userData.address2 && (await this.page.getByRole("textbox", { name: "Address 2" }).fill(userData.address2));
		await this.page.getByLabel("Country *").selectOption(userData.country);
		await this.page.getByRole("textbox", { name: "State" }).fill(userData.state);
		await this.page.getByRole("textbox", { name: "City" }).fill(userData.city);
		await this.page.locator("#zipcode").fill(userData.zipcode);
		await this.page.getByRole("textbox", { name: "Mobile Number" }).fill(userData.mobileNumber);
	}

	async fillAccountInformation(userData: {
		title: "Mr." | "Mrs.";
		name: string;
		email: string;
		password: string;
		dateOfBirth?: { day: string; month: string; year: string };
	}) {
		await this.page.getByText(userData.title).click();
		await this.page.getByRole("textbox", { exact: true, name: "Name *" }).fill(userData.name);
		const email = this.page.getByRole("textbox", { exact: true, name: "Email *" });

		!(await email.isDisabled()) && (await email.fill(userData.email));

		await this.page.getByRole("textbox", { name: "Password *" }).fill(userData.password);

		if (userData.dateOfBirth) {
			await this.page.locator("#days").selectOption(userData.dateOfBirth.day);
			await this.page.locator("#months").selectOption(userData.dateOfBirth.month);
			await this.page.locator("#years").selectOption(userData.dateOfBirth.year);
		}
	}

	async subscribeNewsletter() {
		await this.page.getByRole("checkbox", { name: "Sign up for our newsletter!" }).check();
	}

	async subscribeSpecialOffers() {
		await this.page.getByRole("checkbox", { name: "Receive special offers from" }).check();
	}

	async createAccount() {
		await this.page.getByRole("button", { name: "Create Account" }).click();
	}
}

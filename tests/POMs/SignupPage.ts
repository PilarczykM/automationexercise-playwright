import type { Page } from "@playwright/test";

export type AddressInformation = {
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
};

export type AccountInformation = {
	title: "Mr." | "Mrs.";
	name: string;
	email: string;
	password: string;
	dateOfBirth?: { day: string; month: string; year: string };
};

export class SignupPage {
	constructor(readonly page: Page) {}

	get selectors() {
		return {
			accountInformationHeading: this.page.getByText("Enter Account Information"),
			address2Input: this.page.getByRole("textbox", { name: "Address 2" }),
			addressInput: this.page.getByRole("textbox", { name: "Address *" }),
			cityInput: this.page.getByRole("textbox", { name: "City" }),
			companyInput: this.page.getByRole("textbox", { exact: true, name: "Company" }),
			countryDropdown: this.page.getByLabel("Country *"),
			createAccountButton: this.page.getByRole("button", { name: "Create Account" }),
			daysDropdown: this.page.locator("#days"),
			emailInput: this.page.getByRole("textbox", { exact: true, name: "Email *" }),
			firstNameInput: this.page.getByRole("textbox", { name: "First name" }),
			lastNameInput: this.page.getByRole("textbox", { name: "Last name" }),
			mobileNumberInput: this.page.getByRole("textbox", { name: "Mobile Number" }),
			monthsDropdown: this.page.locator("#months"),
			nameInput: this.page.getByRole("textbox", { exact: true, name: "Name *" }),
			newsletterCheckbox: this.page.getByRole("checkbox", { name: "Sign up for our newsletter!" }),
			passwordInput: this.page.getByRole("textbox", { name: "Password *" }),
			specialOffersCheckbox: this.page.getByRole("checkbox", { name: "Receive special offers from" }),
			stateInput: this.page.getByRole("textbox", { name: "State" }),
			titleRadioButton: (title: "Mr." | "Mrs.") => this.page.getByText(title),
			yearsDropdown: this.page.locator("#years"),
			zipcodeInput: this.page.locator("#zipcode"),
		};
	}

	async fillAddressInformation(userData: AddressInformation) {
		await this.selectors.firstNameInput.fill(userData.firstName);
		await this.selectors.lastNameInput.fill(userData.lastName);
		if (userData.company) await this.selectors.companyInput.fill(userData.company);
		await this.selectors.addressInput.fill(userData.address);
		if (userData.address2) await this.selectors.address2Input.fill(userData.address2);
		await this.selectors.countryDropdown.selectOption(userData.country);
		await this.selectors.stateInput.fill(userData.state);
		await this.selectors.cityInput.fill(userData.city);
		await this.selectors.zipcodeInput.fill(userData.zipcode);
		await this.selectors.mobileNumberInput.fill(userData.mobileNumber);
	}

	async fillAccountInformation(userData: AccountInformation) {
		await this.selectors.titleRadioButton(userData.title).click();
		await this.selectors.nameInput.fill(userData.name);
		const email = this.selectors.emailInput;

		if (!(await email.isDisabled())) await email.fill(userData.email);

		await this.selectors.passwordInput.fill(userData.password);

		if (userData.dateOfBirth) {
			await this.selectors.daysDropdown.selectOption(userData.dateOfBirth.day);
			await this.selectors.monthsDropdown.selectOption(userData.dateOfBirth.month);
			await this.selectors.yearsDropdown.selectOption(userData.dateOfBirth.year);
		}
	}

	async subscribeNewsletter() {
		await this.selectors.newsletterCheckbox.check();
	}

	async subscribeSpecialOffers() {
		await this.selectors.specialOffersCheckbox.check();
	}

	async createAccount() {
		await this.selectors.createAccountButton.click();
	}
}

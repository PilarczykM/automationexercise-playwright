import type { Page } from "@playwright/test";

type AddressInformation = {
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

type AccountInformation = {
	title: "Mr." | "Mrs.";
	name: string;
	email: string;
	password: string;
	dateOfBirth?: { day: string; month: string; year: string };
};

export class SignupPage {
	constructor(readonly page: Page) {}

	private get selectors() {
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

	getAccountInformationHeading() {
		return this.selectors.accountInformationHeading;
	}

	async fillAccountInformation(accountInformation: AccountInformation) {
		await this.selectTitle(accountInformation.title);
		await this.fillName(accountInformation.name);
		await this.fillEmail(accountInformation.email);
		await this.fillPassword(accountInformation.password);
		if (accountInformation.dateOfBirth) {
			await this.selectDateOfBirth(accountInformation.dateOfBirth);
		}
	}

	async fillAddressInformation(addressInformation: AddressInformation) {
		await this.fillFirstName(addressInformation.firstName);
		await this.fillLastName(addressInformation.lastName);
		if (addressInformation.company) {
			await this.fillCompany(addressInformation.company);
		}
		await this.fillAddress(addressInformation.address);
		if (addressInformation.address2) {
			await this.fillAddress2(addressInformation.address2);
		}
		await this.selectCountry(addressInformation.country);
		await this.fillState(addressInformation.state);
		await this.fillCity(addressInformation.city);
		await this.fillZipcode(addressInformation.zipcode);
		await this.fillMobileNumber(addressInformation.mobileNumber);
	}

	async selectTitle(title: "Mr." | "Mrs.") {
		await this.selectors.titleRadioButton(title).click();
	}

	async fillName(name: string) {
		await this.selectors.nameInput.fill(name);
	}

	async fillEmail(email: string) {
		const emailInput = this.selectors.emailInput;
		if (!(await emailInput.isDisabled())) {
			await emailInput.fill(email);
		}
	}

	async fillPassword(password: string) {
		await this.selectors.passwordInput.fill(password);
	}

	async selectDateOfBirth(dateOfBirth: { day: string; month: string; year: string }) {
		await this.selectors.daysDropdown.selectOption(dateOfBirth.day);
		await this.selectors.monthsDropdown.selectOption(dateOfBirth.month);
		await this.selectors.yearsDropdown.selectOption(dateOfBirth.year);
	}

	async checkNewsletter() {
		await this.selectors.newsletterCheckbox.check();
	}

	async checkSpecialOffers() {
		await this.selectors.specialOffersCheckbox.check();
	}

	async fillFirstName(firstName: string) {
		await this.selectors.firstNameInput.fill(firstName);
	}

	async fillLastName(lastName: string) {
		await this.selectors.lastNameInput.fill(lastName);
	}

	async fillCompany(company: string) {
		await this.selectors.companyInput.fill(company);
	}

	async fillAddress(address: string) {
		await this.selectors.addressInput.fill(address);
	}

	async fillAddress2(address2: string) {
		await this.selectors.address2Input.fill(address2);
	}

	async selectCountry(country: AddressInformation["country"]) {
		await this.selectors.countryDropdown.selectOption(country);
	}

	async fillState(state: string) {
		await this.selectors.stateInput.fill(state);
	}

	async fillCity(city: string) {
		await this.selectors.cityInput.fill(city);
	}

	async fillZipcode(zipcode: string) {
		await this.selectors.zipcodeInput.fill(zipcode);
	}

	async fillMobileNumber(mobileNumber: string) {
		await this.selectors.mobileNumberInput.fill(mobileNumber);
	}

	async clickCreateAccount() {
		await this.selectors.createAccountButton.click();
	}
}

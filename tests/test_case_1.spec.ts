import { faker } from "@faker-js/faker";
import { expect, test } from "./fixtures/base";
import type { AccountInformation } from "./POMs/SignupPage";
import { COUNTRIES } from "./POMs/SignupPage";

test("Register User", async ({ homePage, signupLoginPage, signupPage, accountInformationPage }) => {
	const gender: "male" | "female" = faker.helpers.arrayElement(["male", "female"]);
	const user_data = {
		address: faker.location.streetAddress(),
		address2: faker.location.secondaryAddress(),
		city: faker.location.city(),
		company: faker.company.name(),
		country: faker.helpers.arrayElement(Object.values(COUNTRIES)),
		dateOfBirth: faker.date.birthdate({ max: 65, min: 18, mode: "age" }),
		email: "", // Will be set below using firstName and lastName
		firstName: faker.person.firstName(gender),
		lastName: faker.person.lastName(),
		mobileNumber: faker.phone.number({ style: "international" }),
		name: "",

		password: faker.internet.password({ length: 12, memorable: false }),
		state: faker.location.state({ abbreviated: true }),
		title: gender === "male" ? "Mr." : "Mrs.",
		zipcode: "",
	};
	user_data.name = `${user_data.firstName} ${user_data.lastName}`;
	user_data.email = faker.internet.email({
		firstName: user_data.firstName,
		lastName: user_data.lastName,
	});
	user_data.zipcode = faker.location.zipCode(user_data.state);

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(homePage.sliderLocator).toBeVisible();
	});
	await test.step("Click on 'Signup / Login' button", async () => {
		await homePage.navigation.navigateTo("signupLoginLink");
	});
	await test.step("Verify 'New User Signup!' is visible", async () => {
		await expect(signupLoginPage.selectors.signupHeading).toBeVisible();
	});
	await test.step("Enter name and email address", async () => {
		await signupLoginPage.registerNewUser(user_data.name, user_data.email);
	});
	await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
		await expect(signupPage.getAccountInformationHeading()).toBeVisible();
	});
	await test.step("Fill details: Title, Name, Email, Password, Date of birth", async () => {
		await signupPage.fillAccountInformation({
			dateOfBirth: {
				day: user_data.dateOfBirth.getDay().toString(),
				month: user_data.dateOfBirth.getMonth().toString(),
				year: user_data.dateOfBirth.getFullYear().toString(),
			},
			email: user_data.email,
			name: user_data.name,
			password: user_data.password,
			title: user_data.title as AccountInformation["title"],
		});
	});
	await test.step("Select checkbox 'Sign up for our newsletter!'", async () => {
		await signupPage.checkNewsletter();
	});
	await test.step("Select checkbox 'Receive special offers from our partners!'", async () => {
		await signupPage.checkSpecialOffers();
	});
	await test.step("Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number", async () => {
		await signupPage.fillAddressInformation({
			address: user_data.address,
			address2: user_data.address2,
			city: user_data.city,
			company: user_data.company,
			country: user_data.country,
			firstName: user_data.firstName,
			lastName: user_data.lastName,
			mobileNumber: user_data.mobileNumber,
			state: user_data.state,
			zipcode: user_data.zipcode,
		});
	});
	await test.step("Click 'Create Account button'", async () => {
		await signupPage.clickCreateAccount();
	});
	await test.step("Verify that 'ACCOUNT CREATED!' is visible", async () => {
		await expect(accountInformationPage.selectors.accountCreatedHeading).toBeVisible();
	});
	await test.step("Click 'Continue' button", async () => {
		await accountInformationPage.continue();
	});
	await test.step(`Verify that 'Logged in as ${user_data.name}' is visible`, async () => {
		const isLogged = await homePage.navigation.getLoggedAsInfo();

		if (isLogged == null) {
			throw Error(`Logged in as ${user_data.name}' is not visible`);
		}
		await expect(isLogged).toContainText(user_data.name);
	});
	await test.step("Click 'Delete Account' button", async () => {
		await homePage.navigation.navigateTo("deleteAccountLink");
	});
	await test.step("Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button", async () => {
		await expect(accountInformationPage.selectors.accountDeletedHeading).toBeVisible();
		await accountInformationPage.continue();
	});
});

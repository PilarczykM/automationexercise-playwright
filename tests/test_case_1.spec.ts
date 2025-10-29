import { expect, test } from "./fixtures/base";

const USER = "Marian";
const EMAIL = "marian@gmail.com";

test("Register User", async ({ homePage, signupLoginPage, signupPage, accountInformationPage }) => {
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
		await signupLoginPage.registerNewUser(USER, EMAIL);
	});
	await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
		await expect(signupPage.getAccountInformationHeading()).toBeVisible();
	});
	await test.step("Fill details: Title, Name, Email, Password, Date of birth", async () => {
		await signupPage.fillAccountInformation({
			dateOfBirth: {
				day: "22",
				month: "January",
				year: "1990",
			},
			email: EMAIL,
			name: USER,
			password: "password",
			title: "Mr.",
		});
	});
	await test.step("Select checkbox 'Sign up for our newsletter!'", async () => {
		await signupPage.subscribeNewsletter();
	});
	await test.step("Select checkbox 'Receive special offers from our partners!'", async () => {
		await signupPage.subscribeSpecialOffers();
	});
	await test.step("Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number", async () => {
		await signupPage.fillAddressInformation({
			address: "Lake 3",
			address2: "Lake 2",
			city: "New York",
			company: "NoJob",
			country: "United States",
			firstName: "Marian",
			lastName: "Lolek",
			mobileNumber: "123456789",
			state: "NY",
			zipcode: "12345",
		});
	});
	await test.step("Click 'Create Account button'", async () => {
		await signupPage.createAccount();
	});
	await test.step("Verify that 'ACCOUNT CREATED!' is visible", async () => {
		await expect(accountInformationPage.selectors.accountCreatedHeading).toBeVisible();
	});
	await test.step("Click 'Continue' button", async () => {
		await accountInformationPage.continue();
	});
	await test.step(`Verify that 'Logged in as ${USER}' is visible`, async () => {
		const isLogged = await homePage.navigation.getLoggedAsInfo();

		if (isLogged == null) {
			throw Error(`Logged in as ${USER}' is not visible`);
		}
		await expect(isLogged).toContainText(USER);
	});
	await test.step("Click 'Delete Account' button", async () => {
		await homePage.navigation.navigateTo("deleteAccountLink");
	});
	await test.step("Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button", async () => {
		await expect(accountInformationPage.selectors.accountDeletedHeading).toBeVisible();
		await accountInformationPage.continue();
	});
});

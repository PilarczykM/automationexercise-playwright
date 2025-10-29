import { test as base } from "@playwright/test";
import { AccountInformationPage } from "../POMs/AccountInformation";
import { Navigation } from "../POMs/components/navigation";
import { HomePage } from "../POMs/HomePage";
import { SignUpLoginPage } from "../POMs/SignupLoginPage";
import { SignupPage } from "../POMs/SignupPage";

type TestFixtures = {
	signupLoginPage: SignUpLoginPage;
	homePage: HomePage;
	signupPage: SignupPage;
	accountInformationPage: AccountInformationPage;
};

export const test = base.extend<TestFixtures>({
	accountInformationPage: async ({ page }, use) => {
		const accountInformationPage = new AccountInformationPage(page);
		await use(accountInformationPage);
	},
	homePage: async ({ page }, use) => {
		await page.goto("/");
		const consentButton = page.getByRole("button", { name: "Consent" });
		if (await consentButton.isVisible()) {
			await consentButton.click();
		}
		const navigation = new Navigation(page);
		const homePage = new HomePage(page, navigation);
		await use(homePage);
	},

	signupLoginPage: async ({ page }, use) => {
		const navigation = new Navigation(page);
		const signupLoginPage = new SignUpLoginPage(page, navigation);
		await use(signupLoginPage);
	},

	signupPage: async ({ page }, use) => {
		const signupPage = new SignupPage(page);
		await use(signupPage);
	},
});

export { expect } from "@playwright/test";

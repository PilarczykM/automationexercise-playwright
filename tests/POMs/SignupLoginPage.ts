import type { Page } from "playwright";
import type { Navigation } from "./components/navigation";

export class SignUpLoginPage {
	readonly navigation: Navigation;

	constructor(
		private readonly page: Page,
		navigation: Navigation,
	) {
		this.navigation = navigation;
	}

	get selectors() {
		return {
			loginButton: this.page.locator('[data-qa="login-button"]'),
			loginEmail: this.page.locator('[data-qa="login-email"]'),
			loginName: this.page.locator('[data-qa="login-name"]'),
			signupButton: this.page.locator('[data-qa="signup-button"]'),
			signupEmail: this.page.locator('[data-qa="signup-email"]'),
			signupHeading: this.page.getByRole("heading", { name: "New User Signup!" }),
			signupName: this.page.locator('[data-qa="signup-name"]'),
		};
	}

	goto = async () => {
		await this.navigation.navigateTo("signupLoginLink");
	};

	registerNewUser = async (name: string, email: string) => {
		await this.selectors.signupName.fill(name);
		await this.selectors.signupEmail.fill(email);
		await this.selectors.signupButton.click();
	};
}

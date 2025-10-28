import type { Page } from "@playwright/test";

export class AccountInformationPage {
	constructor(readonly page: Page) {}

	get selectors() {
		return {
			accountCreatedHeading: this.page.getByText("ACCOUNT CREATED!"),
			accountDeletedHeading: this.page.getByText("Account Deleted!"),
		};
	}

	async continue() {
		await this.page.getByRole("link", { name: "Continue" }).click();
	}
}

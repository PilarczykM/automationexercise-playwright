import type { Page } from "@playwright/test";
import type { Navigation } from "./components/navigation";

export class HomePage {
	readonly navigation: Navigation;

	constructor(
		private readonly page: Page,
		navigation: Navigation,
	) {
		this.navigation = navigation;
	}

	get selectors() {
		return {
			slider: this.page.locator("#slider"),
		};
	}
}

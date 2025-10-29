import type { Page } from "@playwright/test";
import type { Navigation } from "./components/navigation";

export class HomePage {
	constructor(
		private readonly page: Page,
		readonly navigation: Navigation,
	) {}

	private get selectors() {
		return {
			slider: this.page.locator("#slider"),
		};
	}

	get sliderLocator() {
		return this.selectors.slider;
	}
}

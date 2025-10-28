# template-playwright

This project is a template for Playwright tests, providing a basic setup for end-to-end testing.

## Table of Contents

- [template-playwright](#template-playwright)
	- [Table of Contents](#table-of-contents)
	- [Usage](#usage)
	- [Scripts](#scripts)
	- [Dependencies](#dependencies)
	- [Configuration](#configuration)

## Usage

To run the Playwright tests, you can use the following command:

```bash
npx playwright test
```

This will launch the test runner and execute all the tests in the `tests` directory.

## Scripts

This project does not yet have any custom scripts defined in `package.json`. You can add your own scripts to automate common tasks.

## Dependencies

This project uses the following development dependencies:

-   `@biomejs/biome`: A modern toolchain for web development, used for formatting and linting.
-   `@playwright/test`: The core library for writing and running Playwright tests.
-   `@types/node`: TypeScript type definitions for Node.js.
-   `dotenv`: A module to load environment variables from a `.env` file.

## Configuration

-   **Playwright Configuration**: The main configuration for Playwright is in `playwright.config.ts`.
-   **Biome Configuration**: The Biome configuration is in `biome.json`.
-   **Environment Variables**: You can create a `.env` file in the root of the project to store environment variables. An example is provided in `.env/.env.example`.

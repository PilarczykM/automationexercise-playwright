.PHONY: help format lint check test

help:
	@echo "Available commands:"
	@echo "  format - Format all files using Biome"
	@echo "  lint   - Lint files and apply safe fixes using Biome"
	@echo "  check  - Format, lint, and organize imports of all files using Biome"
	@echo "  test   - Run Playwright tests"

# Format all files
format:
	npx @biomejs/biome format --write

# Lint files and apply safe fixes to all files
lint:
	npx @biomejs/biome lint --write

# Format, lint, and organize imports of all files
check:
	npx @biomejs/biome check --write

# Run Playwright tests
test:
	npx playwright test

report:
	npx playwright show-report --port=9323 --host=0.0.0.0

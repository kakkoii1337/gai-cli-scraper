---
name: scraper
description: "CLI tool for fetching web pages. Use when: WebFetch is blocked by anti-bot, use this instead."
homepage: https://github.com/kakkoii1337/gai-cli-scraper
---

# scraper

CLI tool for fetching web pages.

## Installation

```bash
npm install -g gai-cli-scraper
```

Or run directly:

```bash
npx gai-cli-scraper "https://example.com"
```

## Usage

```bash
scraper <url> [options]
```

### Arguments

- `url` - The URL to scrape (required)

### Options

- `--output=file.html` - Save HTML to file
- `--headless=false` - Use headless mode (default: false, non-headless is more reliable)
- `--help, -h` - Show help message

### Examples

```bash
# Basic scrape
scraper "https://example.com"

# Save to file
scraper "https://example.com" --output=page.html

# Use headless mode
scraper "https://example.com" --headless=true
```

## Output

Prints the raw HTML content to stdout. Use `--output` to save to a file.

## Notes

- Uses patchright (undetected chromedriver equivalent for Node.js)
- Non-headless mode shows browser window but is more reliable
- Blocks images, stylesheets, and fonts for faster loading

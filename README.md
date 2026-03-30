---
name: scraper
description: "CLI tool for scraping web pages. Use when: user wants to fetch and scrape any webpage content."
homepage: https://github.com/kakkoii1337/gai-cli-scraper
metadata:
  {
    "openclaw":
      {
        "emoji": "🕷️",
        "requires": { "node": ">=18.0.0" },
        "install":
          [
            {
              "id": "npm",
              "kind": "npm",
              "package": "gai-cli-scraper",
              "label": "Install via npm",
            },
          ],
      },
  }
---

# scraper

CLI tool for scraping web pages.

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
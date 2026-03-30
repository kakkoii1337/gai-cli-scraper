#!/usr/bin/env node
/**
 * gai-cli-scraper - CLI tool for scraping web pages
 *
 * Usage: scraper <url> [--output=file.html] [--headless=false]
 */

import { writeFileSync, existsSync } from "fs";
import patchright from "patchright";

const DEFAULT_TIMEOUT = 60000;

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        url: "",
        output: "",
        headless: false,
    };

    for (const arg of args) {
        if (arg.startsWith("--output=")) {
            options.output = arg.split("=")[1];
        } else if (arg.startsWith("--headless=")) {
            options.headless = arg.split("=")[1] === "true";
        } else if (arg === "--help" || arg === "-h") {
            printHelp();
            process.exit(0);
        } else if (!arg.startsWith("--")) {
            options.url = arg;
        }
    }

    if (!options.url) {
        console.error("Error: URL is required");
        printHelp();
        process.exit(1);
    }

    try {
        new URL(options.url);
    } catch {
        console.error("Error: Invalid URL");
        printHelp();
        process.exit(1);
    }

    return options;
}

function printHelp() {
    console.log(`
scraper - CLI tool for scraping web pages

Usage: scraper <url> [options]

Arguments:
  url                  The URL to scrape

Options:
  --output=file.html  Save HTML to file
  --headless=false    Use headless mode (default: false, non-headless is more reliable)
  --help, -h          Show this help message

Examples:
  scraper "https://example.com"
  scraper "https://example.com" --output=page.html
  scraper "https://example.com" --headless=true
`);
}

async function scrapePage(url, headless = false, timeout = DEFAULT_TIMEOUT) {
    const browser = await patchright.chromium.launch({
        headless,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    try {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.route("**/*", async (route) => {
            const resourceType = route.request().resourceType();
            if (["image", "stylesheet", "font"].includes(resourceType)) {
                await route.abort();
            } else {
                await route.continue();
            }
        });

        await page.goto(url, { waitUntil: "domcontentloaded", timeout });
        await page.waitForTimeout(3000);

        const html = await page.content();

        await context.close();
        await browser.close();

        return html;
    } catch (error) {
        await browser.close();
        throw error;
    }
}

async function main() {
    const options = parseArgs();

    console.error(`Scraping: ${options.url}`);
    console.error(`Headless: ${options.headless}`);

    const html = await scrapePage(options.url, options.headless);

    if (options.output) {
        writeFileSync(options.output, html);
        console.error(`HTML saved to: ${options.output}`);
    }

    console.log(html);
}

main().catch((error) => {
    console.error("Error:", error.message);
    process.exit(1);
});
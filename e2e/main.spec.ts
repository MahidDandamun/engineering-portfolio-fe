import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
	test("should load successfully and display hero section", async ({ page }) => {
		await page.goto("/");

		// Check for hero heading
		await expect(page.locator("h1").first()).toBeVisible();

		// Check for main navigation
		await expect(page.locator("nav")).toBeVisible();

		// Check for featured projects section
		await expect(page.getByText(/featured projects/i)).toBeVisible();
	});

	test("should navigate to projects page", async ({ page }) => {
		await page.goto("/");

		// Click on projects link in navigation
		await page
			.getByRole("link", { name: /projects/i })
			.first()
			.click();

		// Should navigate to projects page
		await expect(page).toHaveURL(/\/projects/);
		await expect(page.locator("h1")).toContainText(/projects/i);
	});

	test("should toggle theme", async ({ page }) => {
		await page.goto("/");

		// Find and click theme toggle button
		const themeToggle = page.locator('[aria-label*="theme" i], [aria-label*="toggle" i]').first();
		await themeToggle.click();

		// Check if html class changed (light/dark)
		const htmlElement = page.locator("html");
		const themeClass = await htmlElement.getAttribute("class");
		expect(themeClass).toMatch(/light|dark/);
	});
});

test.describe("Projects Page", () => {
	test("should display project filters", async ({ page }) => {
		await page.goto("/projects");

		// Check for category filters
		await expect(page.getByText(/all/i)).toBeVisible();
		await expect(page.getByText(/web/i)).toBeVisible();
	});

	test("should filter projects by category", async ({ page }) => {
		await page.goto("/projects");

		// Click on a category filter (e.g., "web")
		await page.getByRole("button", { name: /web/i }).click();

		// URL should contain the category parameter
		await expect(page).toHaveURL(/category=web/);
	});

	test("should navigate to project detail page", async ({ page }) => {
		await page.goto("/projects");

		// Wait for projects to load
		await page.waitForSelector('[data-testid="project-card"], article, .project-card', { timeout: 10000 });

		// Click on the first project card
		const projectLinks = page.locator("a[href*='/projects/']").filter({ hasText: /.+/ });
		const firstProject = projectLinks.first();

		if ((await firstProject.count()) > 0) {
			await firstProject.click();

			// Should navigate to project detail page
			await expect(page).toHaveURL(/\/projects\/[^/]+$/);
		}
	});
});

test.describe("Certificates Page", () => {
	test("should display certificates", async ({ page }) => {
		await page.goto("/certificates");

		// Check for page title
		await expect(page.locator("h1")).toContainText(/certificates/i);

		// Check for certificates grid or empty message
		const hasCertificates = await page.locator('[data-testid="certificate-card"], .certificate-card').count();
		if (hasCertificates === 0) {
			await expect(page.getByText(/no certificates/i)).toBeVisible();
		}
	});
});

test.describe("Contact Page", () => {
	test("should display contact form", async ({ page }) => {
		await page.goto("/contact");

		// Check for form fields
		await expect(page.locator('input[name="name"], input[placeholder*="name" i]')).toBeVisible();
		await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
		await expect(page.locator('textarea[name="message"], textarea[placeholder*="message" i]')).toBeVisible();

		// Check for submit button
		await expect(page.locator('button[type="submit"]')).toBeVisible();
	});

	test("should show validation errors on empty submit", async ({ page }) => {
		await page.goto("/contact");

		// Submit empty form
		await page.locator('button[type="submit"]').click();

		// Should show validation errors
		await expect(page.locator("text=/required|must be/i").first()).toBeVisible({ timeout: 5000 });
	});
});

test.describe("Admin Login", () => {
	test("should display login form", async ({ page }) => {
		await page.goto("/admin/login");

		// Check for email and password fields
		await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
		await expect(page.locator('input[name="password"], input[type="password"]')).toBeVisible();

		// Check for submit button
		await expect(page.locator('button[type="submit"]')).toBeVisible();
	});

	test("should redirect unauthenticated users from admin pages", async ({ page }) => {
		await page.goto("/admin");

		// Should redirect to login page
		await expect(page).toHaveURL(/\/admin\/login/);
	});
});

test.describe("Navigation", () => {
	test("should have working navigation links", async ({ page }) => {
		await page.goto("/");

		// Test main navigation links
		const navLinks = [
			{ name: /home/i, expectedUrl: "/" },
			{ name: /projects/i, expectedUrl: "/projects" },
			{ name: /certificates/i, expectedUrl: "/certificates" },
			{ name: /contact/i, expectedUrl: "/contact" },
		];

		for (const link of navLinks) {
			await page.goto("/");
			await page.getByRole("link", { name: link.name }).first().click();
			await expect(page).toHaveURL(new RegExp(link.expectedUrl));
		}
	});

	test("should have working footer", async ({ page }) => {
		await page.goto("/");

		// Check for footer
		await expect(page.locator("footer")).toBeVisible();
	});
});

test.describe("Error Handling", () => {
	test("should handle 404 pages gracefully", async ({ page }) => {
		const response = await page.goto("/non-existent-page");

		// Should return 404 status or show 404 page
		expect(response?.status()).toBe(404);
	});
});

test.describe("Responsiveness", () => {
	test("should be mobile responsive", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		// Check if navigation is visible (or hamburger menu)
		await expect(page.locator("nav")).toBeVisible();

		// Check if content is visible
		await expect(page.locator("h1").first()).toBeVisible();
	});

	test("should be tablet responsive", async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto("/");

		// Check if content adapts to tablet size
		await expect(page.locator("h1").first()).toBeVisible();
	});
});

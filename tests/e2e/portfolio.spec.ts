import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage presents the positioning, proof, work, and contact path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I turn ideas into thoughtful web experiences.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Selected Work" })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "I learn fastest by building something real." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "NongPlatoo.Ai" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "DEV-LIFE" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "A few moments I'm proud of." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "From an idea to a working experience." })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Have an idea worth building?" }),
  ).toBeVisible();
  await expect(page.locator("video")).toHaveCount(0);

  const heroBox = await page.locator("[data-hero-scene]").boundingBox();
  const heroMediaBox = await page.locator(".hero-media-frame").boundingBox();
  expect(heroBox).not.toBeNull();
  expect(heroMediaBox).not.toBeNull();
  expect(heroMediaBox?.width).toBeCloseTo(heroBox?.width ?? 0, 0);
  expect(heroMediaBox?.height).toBeCloseTo(heroBox?.height ?? 0, 0);

  const proofLedger = page.getByRole("region", { name: "A few moments I'm proud of." });
  await expect(proofLedger.getByText("NONGPLATOO.AI", { exact: true })).toBeVisible();

  const emailAction = page.locator(".contact-stage__email");
  const emailArrow = emailAction.locator("span").last();
  await emailAction.scrollIntoViewIfNeeded();
  const emailActionBox = await emailAction.boundingBox();
  const emailArrowBox = await emailArrow.boundingBox();
  expect(emailActionBox).not.toBeNull();
  expect(emailArrowBox).not.toBeNull();
  expect((emailArrowBox?.x ?? 0) + (emailArrowBox?.width ?? 0)).toBeLessThan(
    (emailActionBox?.x ?? 0) + (emailActionBox?.width ?? 0),
  );
});

test("credential identity remains available in the server-rendered interactive shell", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();
  const qrResponse = await request.get("/instagram-qr");

  expect(response.ok()).toBe(true);
  expect(html).toContain('data-testid="research-credential"');
  expect(html).not.toContain('data-testid="research-credential-fallback"');
  expect(html).toContain("Wongsathon Witthayakhom");
  expect(html).toContain("From idea to experience.");
  expect(html).toContain('href="/about"');
  expect(html).toContain('src="/instagram-qr"');
  expect(html).toContain("@tajimerose.dev");
  expect(qrResponse.ok()).toBe(true);
  expect(qrResponse.headers()["content-type"]).toContain("image/svg+xml");
});

test("public contact surfaces expose TajimeRose's Instagram profile", async ({ page }) => {
  await page.goto("/");

  const instagramLinks = page.getByRole("link", { name: /Instagram/ });
  await expect(instagramLinks).toHaveCount(2);
  await expect(instagramLinks.first()).toHaveAttribute(
    "href",
    "https://www.instagram.com/tajimerose.dev/",
  );
});

test("builder pass enters once and stays settled after revisiting the section", async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("tajimerose-entry-seen", "1");
  });
  await page.goto("/");

  const stage = page.locator("[data-credential-stage]");
  const credential = page.getByTestId("research-credential");
  const credentialSwing = page.locator(
    '.credential-swing:has([data-testid="research-credential"])',
  );

  await expect(credential).toHaveCount(1);
  await expect
    .poll(() =>
      credentialSwing.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      ),
    )
    .toBeLessThan(0.05);
  await stage.scrollIntoViewIfNeeded();
  await expect(credential).toBeVisible();
  await expect
    .poll(() =>
      credentialSwing.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      ),
    )
    .toBeGreaterThan(0.98);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await stage.scrollIntoViewIfNeeded();

  await expect(credential).toHaveCount(1);
  await expect
    .poll(() =>
      credentialSwing.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      ),
    )
    .toBeGreaterThan(0.98);
});

test("serves deployment metadata and pragmatic security headers", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response?.headers() ?? {};

  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["permissions-policy"]).toContain("camera=()");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000",
  );

  const structuredData = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(structuredData).toContain('"@type":"WebSite"');
  expect(structuredData).toContain('"@type":"Person"');
});

test("reflows at a 200 percent zoom-equivalent viewport", async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 450 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I turn ideas into thoughtful web experiences.",
    }),
  ).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBe(0);
});

test("builder pass exposes truthful front and back states", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const browserProblems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      browserProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

  await page.goto("/");

  await page.locator("[data-credential-stage]").scrollIntoViewIfNeeded();
  const credential = page.getByTestId("research-credential");
  const credentialSwing = page.locator(
    '.credential-swing:has([data-testid="research-credential"])',
  );
  const lanyard = credentialSwing.locator(".credential-lanyard");
  const lanyardStrap = lanyard.locator(".credential-lanyard__strap");
  const lanyardClasp = lanyard.locator(".credential-lanyard__clasp");

  await expect(credential).toBeVisible();
  await expect(credential.locator(".credential-portrait img")).toHaveJSProperty("complete", true);
  await expect
    .poll(() => credential.locator(".credential-portrait img").evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await expect(lanyardStrap).toHaveCount(1);
  await expect(lanyardClasp).toBeVisible();
  await expect(credentialSwing.locator(".credential-card")).toHaveCount(1);

  const strapBox = await lanyardStrap.boundingBox();
  const claspBox = await lanyardClasp.boundingBox();
  const credentialBox = await credential.boundingBox();
  expect(strapBox).not.toBeNull();
  expect(claspBox).not.toBeNull();
  expect(credentialBox).not.toBeNull();
  expect(strapBox?.y ?? 0).toBeLessThan(credentialBox?.y ?? 0);
  expect(Math.abs(
    ((claspBox?.x ?? 0) + (claspBox?.width ?? 0) / 2) -
      ((credentialBox?.x ?? 0) + (credentialBox?.width ?? 0) / 2),
  )).toBeLessThan(12);
  const claspBottom = (claspBox?.y ?? 0) + (claspBox?.height ?? 0);
  const cardTop = credentialBox?.y ?? 0;
  expect(claspBottom - cardTop).toBeGreaterThan(-4);
  expect(claspBottom - cardTop).toBeLessThan(12);

  await expect(credential).toHaveAttribute("data-face", "front");
  await expect(page.getByText("Wongsathon Witthayakhom", { exact: true })).toBeVisible();

  await credential.click();
  await expect(credential).toHaveAttribute("data-face", "back");
  await expect(page.getByText("From idea to experience.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open full profile" })).toHaveAttribute(
    "href",
    "/about",
  );

  await credential.focus();
  await page.keyboard.press("Enter");
  await expect(credential).toHaveAttribute("data-face", "front");
  await page.keyboard.press("Space");
  await expect(credential).toHaveAttribute("data-face", "back");
  expect(browserProblems).toEqual([]);
});

test("selected work forms a semantic desktop editorial stage", async ({ page }) => {
  const browserProblems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      browserProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

  await page.goto("/");

  const scene = page.locator('[data-signature-scene="selected-systems"]');
  const panels = scene.locator("[data-system-panel]");

  await expect(panels).toHaveCount(2);
  await expect(panels.first()).toHaveAttribute("data-project-slug", "nongplatoo-ai");
  await expect(panels.nth(1)).toHaveAttribute("data-project-slug", "dev-life");
  await expect(scene.getByText("ปวช. Project", { exact: true })).toBeVisible();
  await expect(scene.getByText("BU Project", { exact: true })).toBeVisible();
  await expect(scene.getByText("My contribution", { exact: true })).toHaveCount(2);
  await expect(scene.getByText("Current state", { exact: true })).toHaveCount(2);

  await panels.first().scrollIntoViewIfNeeded();
  await expect(scene.locator(".pin-spacer")).toHaveCount(1);
  expect(browserProblems).toEqual([]);
});

test("work index reaches every public case study", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { level: 1, name: "Projects I've designed and built." })).toBeVisible();

  await expect(page.getByRole("heading", { name: "NongPlatoo.Ai", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DEV-LIFE", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "BU Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ปวช. Projects", exact: true })).toBeVisible();

  await page.locator('a[href="/work/dev-life"]').click();
  await expect(page).toHaveURL(/\/work\/dev-life$/);
  await expect(page.getByRole("heading", { level: 1, name: "DEV-LIFE" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Current limitations" })).toBeVisible();

  await page.goto("/work");
  await page.locator('a[href="/work/nongplatoo-ai"]').click();
  await expect(page).toHaveURL(/\/work\/nongplatoo-ai$/);
  await expect(page.getByRole("heading", { level: 1, name: "NongPlatoo.Ai" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Current limitations" })).toBeVisible();
});

test("unknown project routes return the custom not-found experience", async ({ page }) => {
  const response = await page.goto("/work/not-a-public-project");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Looks like this page went missing." })).toBeVisible();
});

test("major routes have no serious automated accessibility violations", async ({ page }) => {
  for (const route of ["/", "/about", "/work", "/work/nongplatoo-ai", "/work/dev-life"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const seriousViolations = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );

    expect(seriousViolations, `${route}: ${JSON.stringify(seriousViolations, null, 2)}`).toEqual([]);
  }
});

test("public routes use the approved builder-first voice", async ({ page }) => {
  for (const route of ["/", "/about", "/work", "/work/nongplatoo-ai", "/work/dev-life"]) {
    await page.goto(route);
    const bodyCopy = await page.locator("body").innerText();
    expect(bodyCopy, route).not.toMatch(/\binspect\w*/i);
  }

  await page.goto("/about");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I learn fastest when I'm building for real people.",
    }),
  ).toBeVisible();
});

test("hero uses the owner-supplied still image without loading video", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const connection = new EventTarget();
    Object.defineProperty(connection, "saveData", { value: true });
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: connection,
    });
  });

  await page.goto("/");

  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.getByText("STILL MODE")).toHaveCount(1);
  await expect(page.getByText("STILL MODE")).toBeHidden();
});

test.describe("reduced motion", () => {
  test("keeps the hero useful without loading autoplay video", async ({ page }) => {
    const browserProblems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        browserProblems.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.getByText("STILL MODE")).toBeVisible();
    await expect(page.getByRole("link", { name: "View My Work" }).first()).toBeVisible();

    await page.locator("[data-credential-stage]").scrollIntoViewIfNeeded();
    const credential = page.getByTestId("research-credential");
    await credential.click();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-hero-scene] .pin-spacer')).toHaveCount(0);
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
    expect(browserProblems).toEqual([]);
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("uses a single-column hero and exposes navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole("link", { name: "About" })).toBeVisible();
    await page.getByRole("button", { name: "Close navigation menu" }).click();

    await page.locator("[data-credential-stage]").scrollIntoViewIfNeeded();
    const credential = page.getByTestId("research-credential");
    await credential.tap();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
  });
});

import { launch } from 'chrome-launcher';
// @ts-ignore
import lighthouse from 'lighthouse';

export async function runLighthouse(url: string, formFactor: 'mobile' | 'desktop') {
  const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
  try {
    const isMobile = formFactor === 'mobile';
    const options = {
      port: chrome.port,
      logLevel: 'silent',
      // @ts-ignore
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        formFactor,
        screenEmulation: isMobile
          ? { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false }
          : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
        throttlingMethod: 'simulate',
      },
    } as any;

    const result = await lighthouse(url, options);
    return result.lhr.categories;
  } finally {
    await chrome.kill();
  }
}

import { test, expect } from '@playwright/test';
import { getEnvNum, resolveBaseUrl, resolveTargets, resolveFormFactors } from '../../helpers/env';
import { runLighthouse } from '../../helpers/lighthouse';

test('Lighthouse - Performance, Accessibility, Best Practices, SEO', async () => {
  const BASE = resolveBaseUrl();
  const TARGETS = resolveTargets(BASE);
  const FORM_FACTORS = resolveFormFactors();

  const MIN_PERF = getEnvNum('MIN_PERF', 0.80);
  const MIN_ACC  = getEnvNum('MIN_ACC', 0.90);
  const MIN_BP   = getEnvNum('MIN_BP',  0.90);
  const MIN_SEO  = getEnvNum('MIN_SEO', 0.90);

  for (const factor of FORM_FACTORS) {
    for (const url of TARGETS) {
      await test.step(`Auditar ${url} (${factor})`, async () => {
        const categories = await runLighthouse(url, factor);

        const perf = categories.performance?.score ?? null;
        const acc  = categories.accessibility?.score ?? null;
        const bp   = categories['best-practices']?.score ?? null;
        const seo  = categories.seo?.score ?? null;

        console.log(`[LH][${factor}] ${url}`);
        console.log(`  Performance:   ${perf}`);
        console.log(`  Accessibility: ${acc}`);
        console.log(`  BestPractices: ${bp}`);
        console.log(`  SEO:           ${seo}`);

        expect(perf!).toBeGreaterThanOrEqual(MIN_PERF);
        expect(acc!).toBeGreaterThanOrEqual(MIN_ACC);
        expect(bp!).toBeGreaterThanOrEqual(MIN_BP);
        expect(seo!).toBeGreaterThanOrEqual(MIN_SEO);
      });
    }
  }
});

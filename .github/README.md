# GitHub Actions Setup

This repository includes automated SEO testing workflows using Playwright and Lighthouse.

## Workflows

### 1. CI - SEO Testing (`ci.yml`)
Runs on every push and pull request to main branches.

**Features:**
- Tests on Node.js 18 and 20
- Tests both mobile and desktop form factors
- Generates Playwright reports
- Runs Lighthouse CI for performance monitoring
- Uploads artifacts for 30 days

### 2. SEO Audit (`seo-audit.yml`)
Runs on a daily schedule and can be triggered manually.

**Features:**
- Daily automated SEO audits
- Manual trigger with custom parameters
- PR comments with results
- Extended artifact retention (90 days)

## Required Secrets and Variables

### Repository Secrets
Add these in your repository settings under Settings > Secrets and variables > Actions:

- `LHCI_GITHUB_APP_TOKEN` (optional): For Lighthouse CI GitHub integration
- `LHCI_TOKEN` (optional): For Lighthouse CI server authentication

### Repository Variables
Add these in your repository settings under Settings > Secrets and variables > Actions > Variables:

- `BASE_URL`: Target URL for testing (e.g., `https://yourwebsite.com`)
- `LH_PATHS`: Comma-separated paths to test (e.g., `/`, `/about`, `/contact`)
- `MIN_PERF`: Minimum performance score (default: 0.80)
- `MIN_ACC`: Minimum accessibility score (default: 0.90)
- `MIN_BP`: Minimum best practices score (default: 0.90)
- `MIN_SEO`: Minimum SEO score (default: 0.90)
- `LHCI_SERVER_URL` (optional): Lighthouse CI server URL

## Local Development

### Prerequisites
- Node.js 18 or 20
- npm

### Setup
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run tests locally
npm run test

# Run SEO tests with custom URL
BASE_URL=https://yourwebsite.com npm run test:seo
```

### Environment Variables
Create a `.env` file in the project root:

```env
BASE_URL=https://yourwebsite.com
LH_PATHS=/,/about,/contact
LH_FORM_FACTOR=mobile,desktop
MIN_PERF=0.80
MIN_ACC=0.90
MIN_BP=0.90
MIN_SEO=0.90
```

## Artifacts

The workflows generate several types of artifacts:

1. **Playwright Reports**: HTML reports with test results and screenshots
2. **Lighthouse Reports**: Performance audit reports
3. **SEO Reports**: Custom SEO analysis reports

All artifacts are automatically uploaded and available for download from the Actions tab.

## Customization

### Adding New Test Pages
Update the `LH_PATHS` variable with comma-separated paths:
```
/,/about,/contact,/products,/blog
```

### Adjusting Performance Thresholds
Modify the minimum score variables:
- `MIN_PERF`: Performance score (0-1)
- `MIN_ACC`: Accessibility score (0-1)
- `MIN_BP`: Best practices score (0-1)
- `MIN_SEO`: SEO score (0-1)

### Custom Form Factors
The workflows test both mobile and desktop by default. To test only one:
- Set `LH_FORM_FACTOR` to `mobile` or `desktop`
- Or modify the matrix strategy in the workflow files

## Troubleshooting

### Common Issues

1. **Tests failing due to timeouts**
   - Increase timeout values in `playwright.config.ts`
   - Check if the target website is accessible

2. **Lighthouse CI failures**
   - Verify the target URL is accessible
   - Check network connectivity in the CI environment

3. **Missing artifacts**
   - Ensure tests complete successfully
   - Check artifact upload permissions

### Debug Mode
To run tests in headed mode locally:
```bash
npm run test:headed
```

To run with UI mode:
```bash
npm run test:ui
```

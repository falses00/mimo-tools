---
name: github-workflow-debug
description: 分析 GitHub Actions、Pages、gh run logs、workflow YAML 修复
compatibility: opencode
---

# GitHub Workflow Debug Skill

## What I do
I debug and fix GitHub Actions workflows, GitHub Pages deployments, and CI/CD pipeline issues.

## When to use me
- When GitHub Actions workflows fail
- When GitHub Pages deployments don't work
- When workflow YAML syntax errors occur
- When environment variables or secrets are misconfigured
- When runners or dependencies have issues

## Required checks
- Workflow YAML syntax validation
- Environment variable configuration
- Secret management
- Runner compatibility
- Dependency installation
- Build and test steps
- Deployment configuration
- Permissions and access

## Output format
- Detailed error analysis with log excerpts
- Specific fixes for each issue
- Workflow YAML corrections
- Environment setup recommendations
- Testing and validation steps

## Failure handling
- If workflow fails repeatedly, check for common issues first
- If secrets missing, guide user to configure them
- If runner issues, suggest alternative runners
- If dependency conflicts, provide resolution steps

## Common workflow issues
### YAML syntax errors
```yaml
# Bad - incorrect indentation
jobs:
build:
runs-on: ubuntu-latest

# Good - proper indentation
jobs:
  build:
    runs-on: ubuntu-latest
```

### Missing environment variables
```yaml
# Bad - missing env var
- name: Deploy
  run: ./deploy.sh

# Good - env var defined
- name: Deploy
  env:
    DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
  run: ./deploy.sh
```

### Incorrect trigger configuration
```yaml
# Bad - no workflow_dispatch
on:
  push:
    branches: [main]

# Good - includes workflow_dispatch
on:
  push:
    branches: [main]
  workflow_dispatch:
```

### Permission issues
```yaml
# Bad - insufficient permissions
permissions:
  contents: read

# Good - proper permissions for Pages
permissions:
  contents: read
  pages: write
  id-token: write
```

## Debugging workflow
### Step 1: Check workflow syntax
```bash
# Validate YAML syntax
yamllint .github/workflows/deploy.yml

# Check with actionlint
actionlint .github/workflows/deploy.yml
```

### Step 2: Review workflow runs
```bash
# List recent runs
gh run list --workflow="Deploy to GitHub Pages" --limit 5

# View specific run
gh run view <run-id>

# View run logs
gh run view --log <run-id>

# View failed jobs
gh run view --log-failed <run-id>
```

### Step 3: Check repository settings
```bash
# Check Pages configuration
gh api repos/{owner}/{repo}/pages

# Check repository secrets
gh secret list

# Check environment variables
gh variable list
```

### Step 4: Test locally with act
```bash
# Install act
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run workflow locally
act -l
act -j build
```

## GitHub Pages specific issues
### Pages not enabled
```bash
# Enable Pages via API
gh api -X POST repos/{owner}/{repo}/pages \
  -f build_type=workflow \
  -f source.branch=main \
  -f source.path=/
```

### Wrong build output directory
```yaml
# Check Astro build output
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './apps/blog/dist'  # Correct for Astro
```

### Missing CNAME or custom domain
```yaml
# Add CNAME file if needed
- name: Add CNAME
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  run: |
    echo "custom.domain.com" > CNAME
    git add CNAME
    git commit -m "Add CNAME"
    git push
```

## Common error messages and fixes
### "Resource not accessible by integration"
```yaml
# Fix: Add proper permissions
permissions:
  contents: read
  pages: write
  id-token: write
```

### "The process '/usr/bin/git' failed with exit code 128"
```yaml
# Fix: Checkout with proper token
- uses: actions/checkout@v4
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    fetch-depth: 0
```

### "No such file or directory"
```yaml
# Fix: Check working directory
- name: Build
  run: npm run build
  working-directory: ./apps/blog
```

### "Process completed with exit code 1"
```yaml
# Fix: Add error handling
- name: Build
  run: npm run build || exit 1
  continue-on-error: false
```

## Workflow optimization
### Caching dependencies
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

### Matrix builds
```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]
```

### Conditional steps
```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  run: ./deploy.sh
```

## Security considerations
### Secret management
- Use repository secrets for sensitive data
- Use environment secrets for environment-specific data
- Never log secrets in workflow output
- Rotate secrets regularly

### Permissions
- Follow principle of least privilege
- Use specific permissions instead of `permissions: write-all`
- Use GITHUB_TOKEN instead of personal access tokens when possible

### Third-party actions
- Pin actions to specific SHA
- Review action source code
- Use official actions when possible
- Keep actions updated

## Testing workflow changes
### Test in feature branch
```bash
# Create test branch
git checkout -b test-workflow

# Push changes
git push origin test-workflow

# Check workflow runs
gh run list --workflow="Deploy to GitHub Pages" --limit 5
```

### Manual trigger
```bash
# Trigger workflow manually
gh workflow run "Deploy to GitHub Pages"

# Watch the run
gh run watch
```

### Re-run failed jobs
```bash
# Re-run failed jobs
gh run rerun <run-id> --failed

# Re-run entire workflow
gh run rerun <run-id>
```

## Monitoring and alerting
### Workflow status
```bash
# Check workflow status
gh run list --workflow="Deploy to GitHub Pages" --limit 1

# Get workflow status in JSON
gh api repos/{owner}/{repo}/actions/runs --jq '.workflow_runs[0].conclusion'
```

### Notifications
- Configure GitHub notifications for workflow failures
- Set up Slack/Teams webhooks for alerts
- Use GitHub Actions for status badges

## Rollback procedures
### Revert last commit
```bash
git revert HEAD
git push origin main
```

### Manual deployment
```bash
# Build locally
npm run build

# Deploy to Pages
gh pages deploy ./apps/blog/dist --branch gh-pages
```

### Disable workflow
```yaml
# Add condition to skip workflow
if: false  # Temporarily disable
```

## Documentation
### README badges
```markdown
![Deploy to GitHub Pages](https://github.com/{owner}/{repo}/actions/workflows/deploy.yml/badge.svg)
```

### Workflow documentation
- Document required secrets
- Document environment variables
- Document deployment process
- Document rollback procedures
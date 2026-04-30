---
name: security-release-guard
description: 发布前检查 secrets、危险命令、部署风险
compatibility: opencode
---

# Security Release Guard Skill

## What I do
I review code changes for security vulnerabilities, check for secret leaks, validate deployment configurations, and ensure safe releases.

## When to use me
- Before committing code changes
- Before pushing to production
- Before creating releases
- When reviewing pull requests
- When configuring deployment pipelines

## Required checks
- No hardcoded secrets or credentials
- No dangerous commands or scripts
- Proper environment variable usage
- Secure deployment configurations
- Dependency vulnerability scanning
- Code security best practices

## Output format
- Security audit report with risk ratings
- List of vulnerabilities found (Critical, High, Medium, Low)
- Specific remediation steps for each issue
- Checklist of security requirements
- Approval status (APPROVED, NEEDS CHANGES, BLOCKED)

## Failure handling
- If critical vulnerabilities found, block release
- If secrets exposed, require immediate rotation
- If dangerous commands found, require safer alternatives
- If dependencies vulnerable, require updates

## Security checklist
### Secret management
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No tokens in code
- [ ] No private keys in code
- [ ] No database credentials in code
- [ ] Environment variables used for secrets
- [ ] .gitignore includes .env files
- [ ] No secrets in commit history

### Code security
- [ ] Input validation implemented
- [ ] Output encoding applied
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Path traversal prevention
- [ ] Command injection prevention

### Dependency security
- [ ] No known vulnerabilities in dependencies
- [ ] Dependencies pinned to specific versions
- [ ] Lock files committed (package-lock.json, yarn.lock)
- [ ] Regular dependency updates scheduled

### Deployment security
- [ ] HTTPS enforced
- [ ] Secure headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error handling doesn't expose sensitive info

## Common security issues
### Hardcoded secrets
```javascript
// Bad
const API_KEY = "sk-1234567890abcdef";
const password = "supersecret";

// Good
const API_KEY = process.env.API_KEY;
const password = process.env.PASSWORD;
```

### Dangerous commands
```bash
# Bad - command injection risk
eval($user_input)
exec($user_command)

# Good - safe alternatives
sanitized_input = sanitize($user_input)
safe_command = escape($user_command)
```

### Insecure dependencies
```json
// Bad - vulnerable version
{
  "lodash": "4.17.20"
}

// Good - updated version
{
  "lodash": "4.17.21"
}
```

### Exposed credentials
```yaml
# Bad - credentials in workflow
- name: Deploy
  run: |
    curl -u admin:password https://api.deploy.com

# Good - using secrets
- name: Deploy
  run: |
    curl -u ${{ secrets.DEPLOY_USER }}:${{ secrets.DEPLOY_PASS }} https://api.deploy.com
```

## Scanning tools
### Secret scanning
```bash
# GitLeaks
gitleaks detect --source . --verbose

# TruffleHog
trufflehog git file://. --only-verified

# GitHub secret scanning
gh secret scan
```

### Dependency scanning
```bash
# npm audit
npm audit
npm audit fix

# Snyk
snyk test
snyk monitor
```

### Static analysis
```bash
# ESLint security plugin
npm install eslint-plugin-security
npx eslint --ext .js,.ts .

# SonarQube
sonar-scanner
```

## GitHub specific security
### Repository settings
```bash
# Check repository visibility
gh repo view --json visibility

# Enable vulnerability alerts
gh api -X PUT repos/{owner}/{repo}/vulnerability-alerts

# Enable automated security fixes
gh api -X PUT repos/{owner}/{repo}/automated-security-fixes
```

### Branch protection
```bash
# Enable branch protection
gh api -X PUT repos/{owner}/{repo}/branches/main/protection \
  -f required_status_checks='{"strict":true,"contexts":["build"]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"required_approving_review_count":1}'
```

### Secret management
```bash
# List secrets
gh secret list

# Set secret
gh secret set API_KEY

# Delete secret
gh secret delete API_KEY
```

## Release security
### Pre-release checklist
- [ ] All tests passing
- [ ] Security scan completed
- [ ] No critical vulnerabilities
- [ ] Dependencies updated
- [ ] Changelog reviewed
- [ ] Version bumped
- [ ] Release notes prepared

### Release process
```bash
# Create release
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes "Release notes here"

# Sign release (if GPG configured)
git tag -s v1.0.0 -m "Signed release"
git push origin v1.0.0
```

### Post-release verification
```bash
# Verify deployment
curl -I https://production-site.com

# Check for errors
gh run list --workflow="Deploy" --limit 1

# Monitor logs
gh api repos/{owner}/{repo}/actions/runs --jq '.workflow_runs[0].conclusion'
```

## Incident response
### Secret exposure
1. Rotate compromised credentials immediately
2. Audit access logs for unauthorized usage
3. Notify affected users if necessary
4. Review and improve secret management

### Vulnerability discovered
1. Assess severity and impact
2. Apply patch or workaround
3. Deploy fix immediately
4. Notify users if necessary
5. Document incident and lessons learned

### Deployment failure
1. Rollback to previous version
2. Investigate root cause
3. Apply fix
4. Re-deploy with additional monitoring
5. Document incident

## Security headers
### Content Security Policy
```javascript
// Example CSP header
"Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'"
```

### Other security headers
```javascript
"X-Content-Type-Options": "nosniff"
"X-Frame-Options": "DENY"
"X-XSS-Protection": "1; mode=block"
"Strict-Transport-Security": "max-age=31536000; includeSubDomains"
"Referrer-Policy": "strict-origin-when-cross-origin"
```

## Secure coding practices
### Input validation
```javascript
// Validate and sanitize input
function validateInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }
  return input.trim().slice(0, 1000); // Limit length
}
```

### Output encoding
```javascript
// Encode output to prevent XSS
function encodeOutput(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}
```

### Error handling
```javascript
// Don't expose sensitive info in errors
try {
  // code
} catch (error) {
  console.error('Internal error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
```

## Compliance considerations
### GDPR
- User data handling
- Data retention policies
- Privacy policy
- User consent management

### SOC 2
- Access controls
- Audit logging
- Change management
- Incident response

### HIPAA (if applicable)
- Protected health information
- Encryption requirements
- Access controls
- Audit trails

## Security training
### For developers
- OWASP Top 10
- Secure coding practices
- Secret management
- Dependency security

### For operations
- Infrastructure security
- Monitoring and alerting
- Incident response
- Access management
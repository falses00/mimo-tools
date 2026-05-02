---
name: local-automation-safety
description: Safe local computer automation through localhost agent with dry-run, confirmation, workspace restrictions, command allowlist, and audit logging.
---

# Local Automation Safety Skill

## What I do
I ensure all local computer automation is safe by:
- Only listening on 127.0.0.1 (localhost)
- Default dry-run mode
- Requiring user confirmation for dangerous actions
- Restricting file operations to user-selected workspace
- Blocking dangerous commands (sudo, rm -rf, curl | sh)
- Logging all automation actions

## When to use me
- When projects need to execute local commands
- When users need to clone/build/run repositories
- When projects need to scan local files
- When projects need browser automation

## Required checks
1. All commands must be in allowlist
2. Dangerous commands require explicit confirmation
3. File operations limited to workspace directory
4. No secret logging
5. All actions have audit trail
6. Default to dry-run mode
7. Timeout limits enforced

## Failure handling
- If command not in allowlist, reject with explanation
- If workspace not selected, prompt user
- If confirmation denied, cancel action
- If timeout exceeded, cancel and log

## Security rules
NEVER allow:
- sudo
- rm -rf /
- curl | sh
- Writing to C:\ root
- Reading .env files
- Logging API keys
- Auto-submitting forms with sensitive data
- Executing unknown scripts without review

## Output format
- Plan preview (what will happen)
- Risk assessment
- Required user config
- Execution log
- Success/failure report
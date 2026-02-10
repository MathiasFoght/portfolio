---
name: work-plan
description: Break work into smaller steps, track status, and keep progress synced. Use for multi-step tasks, project planning, or when a user wants clear milestones and execution tracking.
---

# Work Plan

## Overview

This skill turns a task into a small, trackable plan and keeps progress visible from start to finish.

## Workflow

1. Scope and success criteria
   Summarize the request, constraints, and the expected outcome. Note assumptions.

2. Decompose the work
   Create 3-8 concrete tasks with clear outcomes. Keep tasks small and independently verifiable.

3. Confirm the plan
   Present the task list with statuses. Ask for confirmation only if the plan introduces new scope or tradeoffs.

4. Execute in order
   Work on one task at a time. Mark it `in_progress`, then `done` when complete.

5. Keep status current
   After each meaningful change, update the task list and call out blockers or new dependencies.

6. Wrap up
   Summarize what was done, what remains, and suggested next steps.

## Task List Format

Use a single, flat list with explicit status tags:

- `[pending]` Task description
- `[in_progress]` Task description
- `[done]` Task description

If code changes are made, include an Evidence line with file references.

## Guardrails

- Keep the plan short for trivial requests (2 steps max).
- Avoid analysis paralysis; aim for clarity and forward motion.
- If requirements change, re-scope and update the task list.
- Ask targeted questions when blocked.

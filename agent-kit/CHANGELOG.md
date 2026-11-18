# Changelog

## 0.3.0 (2026-11-18)

- Docs skill: repo card operation. One fixed-shape file per repository that
  says what it is for, who owns it, and what it connects to, so the cards of
  many repositories can be collected into a catalogue or a knowledge base.
- MIT licence, included in the release archive.

## 0.2.0 (2026-11-18)

- Installer: one entry point, `install.mjs <harness> <project-directory>`,
  replaces the Claude Code installer script.
- Adapters: GitHub Copilot and Kiro.
- Release archive with an install guide written for the installing agent.
- Skills renamed to plan, implement, fix, review, ship, docs.
- Ignored directories: reading one named file now asks the user; searching
  and listing are still refused.

## 0.1.0 (2026-11-18)

First version.

- Rules: scope and quality, evidence and decisions, delivery workflow,
  documentation impact, delegation, background processes.
- Policies: sensitive paths, ignored directories, gated commands, credential
  shapes.
- Guard: harness-neutral evaluator for read, search, write, and shell
  actions.
- Skills: plan, implement, fix, review, ship, docs.
- Adapter: Claude Code installer and PreToolUse hook.

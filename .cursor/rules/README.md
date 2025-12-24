# Cursor Rules - The Navigator Portfolio

This directory contains `.mdc` rule files that transform Cursor AI into a project-aware coding partner for The Navigator portfolio.

## Rule Architecture

```
.cursor/rules/
├── README.md                    # This file
├── project-identity.mdc         # 🌟 Core: Always applied
├── coding-standards.mdc         # 🌟 Core: Always applied
├── react-components.mdc         # 📎 Auto: *.jsx files
├── tailwind-styling.mdc         # 📎 Auto: *.jsx, *.css files
├── custom-hooks.mdc             # 📎 Auto: hooks/*.js files
├── data-management.mdc          # 📎 Auto: data/*.js files
├── animation-patterns.mdc       # 🤖 Agent: Animation context
├── accessibility.mdc            # 🤖 Agent: A11y context
├── performance.mdc              # 🤖 Agent: Optimization context
└── deployment.mdc               # 📌 Manual: @deployment
```

## Rule Types

### 🌟 Core Rules (`alwaysApply: true`)

Always active for every interaction:

| Rule | Purpose |
|------|---------|
| `project-identity.mdc` | Tech stack, architecture, design philosophy |
| `coding-standards.mdc` | Naming conventions, documentation, patterns |

### 📎 Auto-Attached Rules (Glob patterns)

Automatically applied when working on matching files:

| Rule | Glob Pattern | Triggers |
|------|--------------|----------|
| `react-components.mdc` | `src/components/**/*.jsx`, `src/App.jsx` | JSX components |
| `tailwind-styling.mdc` | `src/**/*.jsx`, `src/**/*.css` | Styling work |
| `custom-hooks.mdc` | `src/hooks/**/*.js` | Custom hooks |
| `data-management.mdc` | `src/data/**/*.js` | Content data |

### 🤖 Agent-Requested Rules (Description-based)

AI invokes these when the context is relevant:

| Rule | Triggered When |
|------|----------------|
| `animation-patterns.mdc` | Working on animations, transitions |
| `accessibility.mdc` | Implementing a11y, keyboard nav, ARIA |
| `performance.mdc` | Optimizing bundle, load times |

### 📌 Manual Rules (Explicit invocation)

Invoke explicitly with `@rulename`:

| Rule | Usage |
|------|-------|
| `deployment.mdc` | Type `@deployment` when preparing deploy |

## Rule Priority

When multiple rules apply, priority from highest to lowest:

1. **Core rules** (always active foundation)
2. **Auto-attached rules** (file-specific guidance)
3. **Agent-requested rules** (context-specific additions)
4. **Manual rules** (explicit user invocation)

## Relationship Map

```
┌─────────────────────────────────────────────────────────────┐
│                     CORE LAYER                               │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │ project-identity    │  │ coding-standards            │   │
│  │ • Tech stack        │  │ • Naming conventions        │   │
│  │ • Architecture      │  │ • Documentation             │   │
│  │ • Design philosophy │  │ • Import organization       │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FILE-SPECIFIC LAYER                        │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ react-        │  │ tailwind-    │  │ custom-hooks    │   │
│  │ components    │──│ styling      │  │ • Hook template │   │
│  │ • Structure   │  │ • Colors     │  │ • Patterns      │   │
│  │ • Patterns    │  │ • Classes    │  │ • Cleanup       │   │
│  └───────────────┘  └──────────────┘  └─────────────────┘   │
│                            │                                 │
│  ┌─────────────────────────┴───────────────────────────┐    │
│  │ data-management                                      │    │
│  │ • Project structure • Skills structure               │    │
│  │ • Career structure  • Content guidelines             │    │
│  └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTEXT-SPECIFIC LAYER                     │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ animation-    │  │ accessibility│  │ performance     │   │
│  │ patterns      │  │ • ARIA       │  │ • Bundle size   │   │
│  │ • Motion      │  │ • Keyboard   │  │ • Lazy loading  │   │
│  │ • Reduced     │  │ • Focus      │  │ • Optimization  │   │
│  └───────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     WORKFLOW LAYER                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ deployment                                           │    │
│  │ • GitHub Pages • CI/CD • Pre-deploy checklist       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Key Enforcements

These rules collectively enforce:

### Do's ✅
- Use JSX only (no TypeScript)
- Import icons from `lucide-react` only
- Use CSS variables for colors
- Check `useReducedMotion()` for animations
- Use semantic HTML with ARIA
- Follow section-based folder structure
- Use named exports for hooks, default for components

### Don'ts ❌
- No TypeScript files
- No external icon libraries
- No inline hex colors
- No animations without reduced motion check
- No class components
- No external state management

## Updating Rules

When the project evolves:

1. **Tech stack change**: Update `project-identity.mdc`
2. **New patterns emerge**: Update relevant rule or create new one
3. **Deprecated patterns**: Add to "Don't" sections with rationale

## Testing Rules

After modifying rules, verify by:

1. Opening a relevant file type
2. Asking Cursor to explain the conventions
3. Asking Cursor to generate code and verify adherence


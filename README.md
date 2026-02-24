# ⚡ StackUnderflow

A frontend-only Q&A discussion platform inspired by Stack Overflow. Built with **React**, **TypeScript**, and **Vite** — no backend, no database. Multiple users can post questions, change statuses, and leave comments. All data persists in `localStorage` so everything survives logout and page refreshes.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (bundled with Node)

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/stack-underflow.git
cd stack-underflow

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Enter any username to log in — no password is required.

### Other Commands

```bash
npm run build    # Type-check + production build → dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## Project Structure

```
src/
├── types.ts                          # Shared TypeScript interfaces: Question, Comment, Status
├── constants.ts                      # Seed data pre-populated on first load
├── utils.ts                          # Pure helpers: timeAgo(), colorFromName(), uid()
│
├── hooks/
│   └── usePersistedState.ts          # Drop-in useState backed by localStorage
│
├── styles/
│   ├── tokens.ts                     # Design tokens: all colors, font sizes, radii, spacing
│   ├── common.ts                     # Reusable style objects and factory functions
│   └── index.css                     # Global CSS: resets, animations, utility classes
│
├── components/
│   ├── ui/
│   │   ├── Avatar.tsx                # Circular user avatar with name-seeded color
│   │   ├── Badge.tsx                 # Status badge (open / answered / closed)
│   │   ├── Button.tsx                # Button with primary, secondary, ghost variants
│   │   ├── Input.tsx                 # Input, Textarea, Select, and Field label wrapper
│   │   └── Modal.tsx                 # Dialog with macOS-style chrome and backdrop
│   ├── layout/
│   │   └── Navbar.tsx                # Sticky top bar: logo, user info, logout, reset data
│   ├── auth/
│   │   └── Login.tsx                 # Login screen (username only, no real auth)
│   ├── questions/
│   │   ├── QuestionCard.tsx          # Compact question row used in the list view
│   │   ├── QuestionForm.tsx          # Create/edit form — shared via optional initial prop
│   │   └── QuestionDetail.tsx        # Full question header with status controls
│   └── comments/
│       ├── CommentCard.tsx           # Single comment with inline editing
│       └── CommentForm.tsx           # New comment textarea + submit
│
├── views/
│   ├── QuestionListView.tsx          # List view: search bar, status filter, question cards
│   └── QuestionDetailView.tsx        # Detail view: question + comment list + comment form
│
└── App.tsx                           # Root: state, actions, and routing between views
```

---

## Approach

### Architecture

The codebase is split into four layers, each with one clear job:

| Layer | Responsibility |
|---|---|
| **Foundation** (`types`, `constants`, `utils`) | Shared types, seed data, and pure helper functions with no side effects |
| **Style system** (`styles/`) | All visual constants in one place — change a color once and it applies everywhere |
| **Components** (`components/`) | UI building blocks. Primitives in `ui/` know nothing about app data. Feature components in `questions/` and `comments/` compose primitives and accept data via props |
| **Views + App** (`views/`, `App.tsx`) | Views assemble components into full-page layouts. `App.tsx` owns all state and handlers and contains no markup of its own beyond routing between views |

### Key Decisions

**State lives in one place.** All `questions` and `comments` state is held in `App.tsx` and passed down through props. Components manage only their own local UI state (e.g. whether a comment card is in edit mode). This makes data flow easy to trace.

**DRY styling via a token system.** Rather than repeating color strings or font sizes across files, all design constants are defined once in `styles/tokens.ts`. The `styles/common.ts` file builds reusable style objects from those tokens (`btnPrimary`, `card`, `inputBase`, etc.), which components import instead of writing their own inline styles.

**One hook for persistence.** `usePersistedState` is a generic drop-in for `useState` that reads from `localStorage` on mount and syncs back on every update. Switching from in-memory to persistent state in `App.tsx` required changing just two lines — the rest of the codebase has no awareness of storage at all.

**One form for two jobs.** `QuestionForm` handles both creating and editing a question. Passing an `initial` prop pre-fills the fields and changes the submit button label to "Save Changes"; omitting it gives a blank creation form. No duplication of form logic.

**Session vs. persistent data.** The logged-in `user` is plain `useState` — it clears on logout intentionally. Questions and comments use `usePersistedState` — they survive logout so multiple users can interact with the same dataset within one browser.

### Multi-User Flow

Since there is no backend, "multiple users" is simulated within one browser:

1. Log in as `alice`, post a question → **logout**
2. Log in as `bob`, comment on alice's question → **logout**
3. Log back in as `alice` — bob's comment is still there, and only alice can edit her own question or change its status

---

## Assumptions & Known Limitations

### Assumptions

- **One browser, multiple users.** The multi-user experience is simulated within a single browser via `localStorage`. Two different browsers or devices will not share data.
- **No real authentication.** Any non-empty string is accepted as a username. Ownership (who can edit a question or comment) is determined by matching the `author` string stored at creation time against the current logged-in username.
- **Seed data loads once.** On first visit, `constants.ts` seeds three questions and two comments into `localStorage`. On subsequent visits the stored data is used. Use the **"reset data"** button in the navbar to wipe storage and restore the seeds.

### Known Limitations

- **No real-time sync between tabs.** If two browser tabs are open simultaneously, changes in one will not appear in the other without a manual refresh. A `window.storage` event listener could address this.
- **No delete.** Questions and comments can be edited but not removed. This was outside the scope of the brief and was intentionally omitted.
- **No markdown support.** Descriptions and comments render as plain pre-wrapped text.
- **No pagination.** All questions load at once. For large datasets, virtual scrolling or server-side pagination would be needed.
- **`localStorage` quota.** Browsers allow roughly 5 MB. More than sufficient for a demo; not suitable for production data volumes.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI components and state management |
| TypeScript | 5 | Type safety across the entire codebase |
| Vite | 5 | Dev server and production bundler |
| localStorage | — | Client-side data persistence (no backend needed) |
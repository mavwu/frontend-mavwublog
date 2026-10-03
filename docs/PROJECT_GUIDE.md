# Mavwu Blog frontend: implementation guide

A static multi-page blog frontend with sign-in, registration, dashboard, and post pages designed to communicate with a separate backend.

## Scope

**Repository role:** Web frontend.

The API runs separately. Frontend visibility is not authorization; protected operations must be checked by the server. Cross-origin forms, fetch calls, and authentication cookies must be tested together.

## Local evaluation

Run a static server from the repository root:

```sh
python -m http.server 4173
```

Open `http://localhost:4173` and select the relevant HTML page or variant directory. No build step is required for plain HTML/CSS/JavaScript. Use a server when scripts fetch local content; opening a file directly can produce different behavior.

## Code map

| Path | Responsibility |
| --- | --- |
| `index.html` | Page or browser application entry |
| `style.css` | Presentation and responsive styles |

## Walkthrough

Serve the frontend with a test backend, register, sign in, create a post, and inspect the signed-out and error states.

## Verification

No meaningful automated application check was established from the reviewed manifest. Evaluate the walkthrough with synthetic data and record the commit, environment, and result. For a static site, inspect narrow/wide layouts, keyboard focus, links, forms, and console errors.

## Evidence for a case study

Describe this repository as a **web frontend**. A useful case study explains the problem above, traces the walkthrough to its source, names a concrete implementation decision, and records a repeatable evaluation. Separate implemented behavior from roadmap work. Capture screenshots using synthetic data and identify the demonstrated commit.

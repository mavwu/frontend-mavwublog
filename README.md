# Mavwu Blog frontend

A static multi-page blog frontend with sign-in, registration, dashboard, and post pages designed to communicate with a separate backend.

## Status and scope

The API runs separately. Frontend visibility is not authorization; protected operations must be checked by the server. Cross-origin forms, fetch calls, and authentication cookies must be tested together.

## Run or evaluate

Run a static server from the repository root:

```sh
python -m http.server 4173
```

Open `http://localhost:4173` and select the relevant HTML page or variant directory. No build step is required for plain HTML/CSS/JavaScript. Use a server when scripts fetch local content; opening a file directly can produce different behavior.

## Example workflow

Serve the frontend with a test backend, register, sign in, create a post, and inspect the signed-out and error states.

## Checks

No meaningful automated application check was established from the reviewed manifest. Evaluate the walkthrough with synthetic data and record the commit, environment, and result. For a static site, inspect narrow/wide layouts, keyboard focus, links, forms, and console errors.

## Implementation notes

See the [implementation guide](docs/PROJECT_GUIDE.md) for the code map, configuration boundary, and evidence to capture for a case study.

# test_pullboard spec

Every requirement is a row with an id. Agents build against approved rows; commits cite the ids they serve. `pullboard spec check` lints this file.

Statuses: approved = decided · draft = proposed · pending = open question · fact = true today · wont = won't build, decided and kept · retired = no longer applies, kept. Ids are permanent: never delete or renumber a row. Tiers: must · aim.

Write each requirement as one row under its section, in this format. The fence keeps the example out of the spec, so no placeholder id is ever committed; your own rows go below, outside it.

```text
- G1 [draft, must] The first thing the client needs, in one line. | gate: the test that proves it
- K1 [draft, must] A constraint, e.g. runs locally with no account. | gate: review
```

## G · Goals: what the client asked for
- G1 [approved, must] The product is a single-page web notes app. | gate: browser smoke test renders the notes interface
- G2 [approved, must] People can create notes with a title and body. | gate: browser test creates and displays a titled note
- G3 [approved, must] People can open and edit existing notes. | gate: browser test edits a note and shows the changed content
- G4 [approved, must] People can delete a note after confirming deletion. | gate: browser test confirms deletion removes only the chosen note
- G5 [approved, must] Notes persist in the same browser after a page reload. | gate: browser test reloads and finds the saved note
- G6 [approved, must] The first visit shows a clear empty state and create action. | gate: browser test finds empty-state copy and create control

## K · Constraints
- K1 [approved, must] The app works without an account or network service. | gate: browser test completes note CRUD with network disabled

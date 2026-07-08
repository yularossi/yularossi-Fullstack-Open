# Part 6 - Redux and State Management

This part contains two separate applications:

## Unicafe App
Feedback application using Zustand for state management.

```bash
cd unicafe
npm install
npm run dev
```

## Anecdotes App
Anecdotes application using Zustand for state management with the following features:
- Display list of anecdotes with vote counts
- Vote for anecdotes (increments vote count)
- Add new anecdotes via form
- Anecdotes sorted by votes in descending order
- Separate components for AnecdoteForm and AnecdoteList

```bash
cd anecdotes
npm install
npm run dev
```

Both applications use **Zustand** for centralized state management instead of prop drilling or context API.

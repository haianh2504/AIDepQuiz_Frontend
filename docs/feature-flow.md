# Feature Flow

## Route and API flow

```text
Homepage `/`
  ├─ internal navigation → smooth-scroll section
  └─ start CTA → `/quiz`

`/quiz`
  ├─ GET `/api/v1/tests/ai-dependence`
  ├─ render 16 API-provided questions/options
  ├─ keep answers in the active client session
  └─ POST `/api/v1/tests/ai-dependence/submit`
       ├─ success: store full response in the active client session
       └─ navigate → `/result_quiz`

`/result_quiz`
  ├─ render the stored submit response
  ├─ retry → confirmation → clear result → `/quiz`
  └─ homepage action → `/`
```

## API boundary

The frontend uses only the endpoints defined in `api-contract.yaml`:

- `GET /api/v1/tests/ai-dependence`
- `POST /api/v1/tests/ai-dependence/submit`

The frontend does not send score, category, feedback, advice, or limitations. The backend creates those fields.

## Business events

| Event | Trigger | Result |
|---|---|---|
| `quiz_loaded` | Test definition request succeeds | Render the first question |
| `answer_selected` | User selects an option | Update the active answer and progress |
| `quiz_submitted` | User completes question 16 | Submit exactly 16 answers |
| `quiz_submit_succeeded` | Submit returns `200` | Store response and navigate to `/result_quiz` |
| `quiz_submit_failed` | Submit returns an error | Keep the quiz state and show a safe error |
| `result_retry_confirmed` | User confirms retry | Clear result and navigate to `/quiz` |

## Error mapping

- `INVALID_REQUEST`: request shape or required field problem.
- `TEST_NOT_FOUND`: test definition/version is unavailable.
- `TEST_VERSION_MISMATCH`: the client version is unsupported.
- `INVALID_ANSWER_COUNT`: answers are not exactly 16.
- `DUPLICATE_QUESTION_ID`: duplicate answer IDs were submitted.
- `UNKNOWN_QUESTION_ID`: an answer references a question outside the definition.
- `INVALID_LIKERT_VALUE`: a value is outside `1–5`.
- `INTERNAL_ERROR`: temporary server failure.


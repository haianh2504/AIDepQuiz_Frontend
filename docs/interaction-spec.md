# Interaction Specification

## Motion principles

- Use smooth transitions for drawer, CTA, option, subscale heading, and route-adjacent state changes.
- Use Lenis for internal Homepage smooth scrolling.
- Keep the Homepage navigation sticky at the top of the viewport while scrolling.
- Use the reusable `ScrollReveal` wrapper for bidirectional viewport entry and exit. Reveal at about 25% visibility, stagger card/list items, and restore hidden state after scrolling away in either direction.
- Respect `prefers-reduced-motion` by reducing transitions and disabling non-essential movement.
- Preserve whitespace and prevent layout shifts during state changes.

## Homepage navigation

- Desktop navigation is visible at wide viewports.
- Tablet/mobile navigation uses the hamburger trigger.
- The hamburger animates to an `X`; the drawer slides from the left.
- The drawer contains only the existing AIDepQuiz navigation links.
- Selecting a link closes the drawer and smooth-scrolls to the matching Homepage section
- `Escape`, the close button, and the backdrop close the drawer.
- Navigation hover/focus adds a thin black underline with the specified vertical padding. Leaving hover restores the default state.

## CTA states

- Primary CTA default: white background, black text, black border.
- Primary CTA hover/pressed: black background and white text.
- Secondary CTA default: black text and arrow.
- Secondary CTA hover/pressed: text and arrow become `#8F8B8B`.
- All CTA transitions are smooth and keyboard accessible.

## Quiz states

- The quiz renders one question at a time
- - Selecting an option changes its background to black and its text to white. Unselected options remain white with a black border.
- The selected answer remains when moving backward and forward in the current quiz session.
- The previous button is disabled on question 1 with background `#4D4D4D` and white text.
- The next button is unavailable until the current question has a valid answer.
- On question 16, after all 16 answers are selected, the next label becomes “Hoàn thành”.
- Successful submission stores the API result in the active in-memory session and navigates to `/result_quiz`.
- The subscale heading changes at question boundaries `4→5`, `8→9`, and `12→13` with a smooth transition.
- Progress fill reflects the number of answered questions; completed fill is `#C1F4FF`, remaining fill is `#F4F3F3`.

## Result states

- `/result_quiz` renders only a result held by the active session.
- Direct access or refresh without an active result redirects to `/`.
- Retry opens a confirmation dialog. Confirming clears the active result and starts a new quiz. Cancelling leaves the result unchanged.
- Homepage action navigates to `/`.
- Subscale cards are horizontal on wide screens and become a vertical list on narrow screens.

## API states

- Loading: show a quiet loading state while fetching the quiz definition or submitting.
- Invalid response: show a non-judgmental error and a retry action.
- `400`, `404`, `409`, and `422`: show a user-safe message without exposing backend internals.
- `500`: show a generic temporary-unavailability message.
- No mock response is used when the API is unavailable.


# Interaction Specification

## Motion principles

- Use smooth transitions for drawer, CTA, option, subscale heading, and route-adjacent state changes.
- Use Lenis for internal Homepage smooth scrolling.
- Keep the Homepage navigation fixed with its top edge 5% of the viewport height below the screen top while scrolling. Preserve the 5vh offset on desktop and use the dynamic viewport equivalent on mobile.
- Use the reusable `ScrollReveal` wrapper for bidirectional viewport entry and exit. Reveal at about 25% visibility, stagger card/list items, and restore hidden state after scrolling away in either direction.
- Respect `prefers-reduced-motion` by reducing transitions and disabling non-essential movement.
- Preserve whitespace and prevent layout shifts during state changes.

## Homepage navigation

- Desktop navigation is visible at wide viewports.
- Tablet/mobile navigation uses the hamburger trigger.
- The hamburger animates to an `X`; the drawer slides in from the right. On tablet and mobile, the navigation pill uses reduced vertical padding while retaining its horizontal spacing and 44px controls.
- The drawer contains only the existing AIDepQuiz navigation links.
- Opening the drawer moves keyboard focus to its close button and traps Tab navigation inside the drawer; closing it returns focus to the hamburger.
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
- Selecting an option changes its background to black and its text to white. Unselected options remain white with a black border.
- After a brief selected-state feedback, choosing an option automatically advances to the next question. Keyboard activation of an option has the same behavior; reduced-motion preference skips the feedback delay.
- The next-question heading receives focus after auto-advance so keyboard and assistive-technology users hear the new question.
- The selected answer remains when moving backward. Selecting a different answer while revisiting a question saves it and advances again.
- “Trước” is disabled on question 1 with background `#4D4D4D` and white text.
- “Tiếp” is available on regular questions after the current answer is saved. Selecting an answer still automatically advances; “Tiếp” supports manual forward navigation when revisiting an answered question.
- The final question has no “Tiếp” button; after all 16 answers are selected, the explicit “Hoàn thành” action submits the answers.
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


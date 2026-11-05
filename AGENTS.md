<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI design rules

### Homepage test overview

- “Về bài test” is a navigation item on the homepage and points to the `#quiz-info` section.
- Center the section within its design frame and keep its content inside the frame boundaries.
- Center each section container within its frame. Center the overview's main title and lead; align the explanatory text and card contents as shown in Figma (left-aligned in the supplied design).
- At the supplied desktop frame, use 200px of left and right screen padding.
- Follow the supplied reference for the section order: centered title and lead, explanatory heading and paragraph, four aspect cards in a two-column grid, then Likert response guidance beside the three-principle panel.
- Do not invent measurements for viewports or component states that have no supplied reference. Ask for the missing specification.

### Typography

Apply these role-based typography rules across the homepage, quiz, and result pages:

| Element | Font | Size | Weight | Letter spacing |
| --- | --- | ---: | --- | ---: |
| Navigation items | Inter | 15px | Regular (400) | Default |
| Logo | Inter | 15px | Extra Bold (800) | Default |
| Main title | Montserrat | 35px | Bold (700) | 0% |
| Main-title description | Inter | 20px | Regular (400) | 5% |
| Button and link text | Inter | 13px | Regular (400) | Default |
| Secondary title | Montserrat | 20px | SemiBold (600) | 0% |
| Secondary-title description and blue card-panel text | Inter | 18px | Regular (400) | 5% |

- Main and secondary descriptions use a 30px line height and occupy 60% of their parent width. Main title-description groups are centered.
- The gap between a main title and its description is 30px. The gap between a secondary title and its description is 16px.
- Button padding is 15px vertical and 30px horizontal.
- Keep these sizes and weights consistent across components that share the same role.
- Do not substitute a different size or weight based on visual guesswork. Ask for the missing design value when an element does not fit one of these roles.

### Cards

- A card title uses the Secondary title typography: Montserrat, 20px, SemiBold (600), 0% letter spacing.
- A card title description uses the Secondary-title description typography: Inter, 18px, Regular (400), 30px line height, 5% letter spacing, and 60% parent width.
- Card parents use 30px padding and a 15px border radius.
- Put the card body content inside a panel with background `#C1F4FF`, 20px padding on all sides, and Inter 18px Regular text with 30px line height and 5% letter spacing.
- Use a 15px border radius on both the parent card and its inner content panel.
- Treat the supplied card image as a visual example; use only the explicitly provided component measurements as fixed values.
- Do not infer unspecified border thickness, spacing between card elements, or card dimensions; request the design value or reference.

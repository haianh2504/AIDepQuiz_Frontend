# UI Components

## Source references

- Homepage desktop: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-e447140d-00f1-4e35-9e56-9ea361c6997a.png`
- Homepage mobile: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-872df349-160f-4516-8087-42def8afc4ce.png`
- Hamburger reference: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-03daf0a8-dbc3-4888-8c6d-328497019346.png`
- Navigation states: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-ed6dafe9-08fc-48be-b7e1-ec49578fac1c.png`, `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-566d0d98-1f74-43f6-8a3d-21941c0ac469.png`
- CTA states: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-c7363c42-bb6c-4355-875e-fa4d52b3131f.png`, `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-d9ef152f-8f68-49af-89d9-70eb85195949.png`
- Internal page composition: `/Users/phanhaianh/Downloads/about (1).svg`
- Quiz references: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-70948d0d-c192-47ec-93b4-c3f3a781814d.png`, `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-d953db96-a0f6-404c-8067-60d4cce21c05.png`
- Result reference: `/var/folders/4w/x0vxppr525l9vtycmzg5k9_80000gn/T/codex-clipboard-cc2c5d2f-150e-4965-90f9-c3f441ce4612.png`

## Shared visual system

- Fonts: Montserrat for headings; Inter for body, logo, navigation, controls, and result text.
- Colors: black `#000000`, white `#FFFFFF`, progress complete `#C1F4FF`, progress remaining `#F4F3F3`, disabled control `#4D4D4D`, secondary hover text `#8F8B8B`.
- Shared typography applies across `/`, `/quiz`, and `/result_quiz`: main titles are 35px Montserrat Bold; main descriptions are 20px Inter Regular with 30px line-height and 5% letter spacing; secondary titles are 20px Montserrat SemiBold; secondary descriptions and cyan-panel text are 18px Inter Regular with 30px line-height and 5% letter spacing.
- Main and secondary descriptions occupy 80% of their parent width. Center main title-description groups; use 30px between a main title and its description and 16px between a secondary title and its description.
- Navigation uses 15px Inter Regular; logo uses 15px Inter Extra Bold; buttons and links use 13px Inter Regular with 15px vertical and 30px horizontal button padding.
- Figma measurements are applied at the supplied desktop frame; responsive overrides preserve readable content on narrow screens.
- Layout uses generous whitespace and content-driven vertical rhythm.
- Components use semantic HTML and visible keyboard focus states.

## Homepage `/`

- `SiteHeader`: sticky top navigation with logo, desktop links, and responsive hamburger trigger.
- `MobileNavigationDrawer`: left-side drawer with close state and the existing navigation items only.
- `ScrollReveal`: reusable client wrapper for sections and items; it supports an `as` element, a visibility threshold, and stagger delay, and reveals again whenever the element re-enters the viewport.
- `HeroSection`: title, description, primary CTA, methodology link, and centered divider. The header stays within its content max width while the hero description occupies 80% of its content block.
- `TestOverviewSection`: centered introduction, left-aligned explanatory copy, a responsive two-column grid for the four AI-dependence aspects, and the Likert response guidance beside the three-principle panel.
- `AspectCardGrid`: four bordered aspect cards with 30px parent padding and 15px corner radius; each cyan description panel uses 20px padding and 15px corner radius. The grid collapses to one column on narrow screens.
- `ResponseGuidance`: five Likert response rows with slightly enlarged labels and number markers, plus the three-principle panel centered vertically in the right column; all internal section dividers use the same centered 1px black rule. The columns stack on smaller screens.
- `AcademicBasisSection`: centered heading and lead, AIDep-22 research summary and sample, research process cards, and a short description of the Vietnamese 16-item version.
- `InterpretationAndPrivacySection`: centered educational interpretation and privacy copy, separated by a horizontal rule.
- `LikertPreview`: static explanatory content for the 16-item scale.
- `SiteFooter`: minimal educational/privacy context only when supported by the approved content.

The Homepage navigation targets internal section IDs. Only the start CTA navigates to `/quiz`.

## Quiz `/quiz`

- `QuizQuestionView`: one statement and five API-provided options.
- `QuizProgress`: answered-progress fill using `#C1F4FF` over `#F4F3F3`.
- `QuizNavigation`: previous/next controls, disabled previous state, disabled previous state, and final “Hoàn thành” label. 
- `SubscaleHeading`: derives the current group from the API question `subscale` key and transitions when the group changes.
- `QuizLoadingState` and `QuizErrorState`: explicit network and malformed-response states.

The quiz page keeps answers in memory for the active flow. It does not calculate score or category.

## Result `/result_quiz`

- `ResultHeader`: title and educational disclaimer.
- `OverallScoreSummary`: backend-provided mean, total score, and category.
- `SubscaleCardGrid`: four backend-provided subscale scores and visual progress bars.
- `FeedbackSection`: backend-provided feedback.
- `AdviceSection`: backend-provided advice rendered as a list of one to three bullets.
- The result header presents the short educational disclaimer. The required backend `limitations` field remains part of the response schema; it is not rendered as a separate numbered section in the final result design.
- `ResultActions`: confirmation-backed retry action and homepage action.

On narrow viewports, the subscale cards become a vertical list. The result page has no Homepage header.


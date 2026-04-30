---
name: accessibility-review
description: 审查 label、aria、键盘导航、focus ring、颜色对比、语义 HTML
compatibility: opencode
---

# Accessibility Review Skill

## What I do
I review frontend interfaces for accessibility compliance, ensuring they are usable by people with disabilities and meet WCAG 2.1 AA standards.

## When to use me
- After implementing new UI components or pages
- Before final deployment to production
- When reviewing form elements and interactive controls
- When testing keyboard navigation and screen reader support
- When evaluating color contrast and visual accessibility

## Required checks
- Semantic HTML structure
- ARIA attributes and roles
- Keyboard navigation and focus management
- Color contrast ratios
- Alternative text for images
- Form labels and error messages
- Skip navigation links
- Language attributes
- Page titles and headings

## Output format
- Accessibility audit report with WCAG criteria references
- Specific violations with severity ratings (A, AA, AAA)
- Concrete code fixes for each issue
- Testing recommendations for assistive technologies
- Compliance score (percentage of WCAG AA criteria met)

## Failure handling
- If critical violations found (Level A), block deployment
- If AA violations found, provide fix timeline
- If AAA violations found, note for future improvement
- If testing tools unavailable, provide manual testing checklist

## WCAG 2.1 AA checklist
### Perceivable
- [ ] 1.1.1 Non-text Content: All images have alt text
- [ ] 1.3.1 Info and Relationships: Semantic HTML used
- [ ] 1.3.2 Meaningful Sequence: Logical reading order
- [ ] 1.3.3 Sensory Characteristics: No sole reliance on color/shape
- [ ] 1.4.1 Use of Color: Color not sole means of conveying info
- [ ] 1.4.3 Contrast (Minimum): 4.5:1 for normal text
- [ ] 1.4.4 Resize Text: Text scalable to 200%
- [ ] 1.4.5 Images of Text: Real text used instead of images

### Operable
- [ ] 2.1.1 Keyboard: All functionality keyboard accessible
- [ ] 2.1.2 No Keyboard Trap: Focus can move away from components
- [ ] 2.4.1 Bypass Blocks: Skip navigation available
- [ ] 2.4.2 Page Titled: Descriptive page titles
- [ ] 2.4.3 Focus Order: Logical tab order
- [ ] 2.4.4 Link Purpose: Clear link text
- [ ] 2.4.6 Headings and Labels: Descriptive headings
- [ ] 2.4.7 Focus Visible: Focus indicator visible
- [ ] 2.5.1 Pointer Gestures: No complex gestures required
- [ ] 2.5.2 Pointer Cancellation: Up-event activation
- [ ] 2.5.3 Label in Name: Accessible name matches visible label
- [ ] 2.5.4 Motion Actuation: No motion-only triggers

### Understandable
- [ ] 3.1.1 Language of Page: html lang attribute set
- [ ] 3.2.1 On Focus: No context change on focus
- [ ] 3.2.2 On Input: No context change on input
- [ ] 3.3.1 Error Identification: Errors clearly identified
- [ ] 3.3.2 Labels or Instructions: Form labels provided
- [ ] 3.3.3 Error Suggestion: Error correction suggested
- [ ] 3.3.4 Error Prevention: Important submissions reversible

### Robust
- [ ] 4.1.1 Parsing: Valid HTML
- [ ] 4.1.2 Name, Role, Value: Proper ARIA usage
- [ ] 4.1.3 Status Messages: ARIA live regions for updates

## Testing tools
### Automated testing
- axe-core: Browser extension and CLI tool
- Lighthouse: Chrome DevTools accessibility audit
- WAVE: Web accessibility evaluation tool
- Pa11y: Command line accessibility testing

### Manual testing
- Keyboard navigation: Tab through all interactive elements
- Screen reader: NVDA (Windows), VoiceOver (Mac), TalkBack (Android)
- High contrast mode: Windows High Contrast
- Zoom: Browser zoom to 200%
- Color blindness: Sim Daltonism, Color Oracle

## Common accessibility issues
### Missing alt text
```html
<!-- Bad -->
<img src="chart.png">

<!-- Good -->
<img src="chart.png" alt="Bar chart showing 2023 sales data by quarter">
```

### Poor color contrast
```css
/* Bad - contrast ratio 2.5:1 */
color: #666;
background: #fff;

/* Good - contrast ratio 7:1 */
color: #333;
background: #fff;
```

### Missing form labels
```html
<!-- Bad -->
<input type="email" placeholder="Email">

<!-- Good -->
<label for="email">Email address</label>
<input type="email" id="email" placeholder="Email">
```

### Inaccessible custom controls
```html
<!-- Bad -->
<div class="button" onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

### Missing focus indicators
```css
/* Bad */
button:focus { outline: none; }

/* Good */
button:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

## ARIA patterns
### Buttons
```html
<button aria-label="Close dialog">×</button>
<button aria-pressed="true">Bold</button>
```

### Navigation
```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Forms
```html
<div role="group" aria-labelledby="personal-info">
  <h2 id="personal-info">Personal Information</h2>
  <label for="name">Name</label>
  <input id="name" aria-required="true">
</div>
```

### Live regions
```html
<div aria-live="polite" aria-atomic="true">
  3 results found
</div>
```

## Testing checklist
### Keyboard testing
- [ ] Tab through all interactive elements
- [ ] Shift+Tab moves focus backward
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate within components
- [ ] Escape closes modals/dropdowns
- [ ] Focus is visible on all elements
- [ ] No focus traps (can tab out of components)

### Screen reader testing
- [ ] Page title announced
- [ ] Headings structure announced
- [ ] Form labels read correctly
- [ ] Error messages announced
- [ ] Dynamic content updates announced
- [ ] Images alt text read
- [ ] Link purposes clear

### Visual testing
- [ ] Text readable at 200% zoom
- [ ] No horizontal scrolling at 320px width
- [ ] Content reflows properly
- [ ] High contrast mode usable
- [ ] Color blind users can understand content
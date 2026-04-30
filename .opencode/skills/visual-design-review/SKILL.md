---
name: visual-design-review
description: 审查页面是否真的精美、是否有视觉层级、间距、色彩、排版、交互状态
compatibility: opencode
---

# Visual Design Review Skill

## What I do
I review frontend interfaces for visual design quality, ensuring they meet professional standards for aesthetics, usability, and user experience.

## When to use me
- After implementing new UI components or pages
- Before final deployment to production
- When reviewing design consistency across the application
- When evaluating visual hierarchy and information architecture
- When checking responsive design across different viewports

## Required checks
- Visual hierarchy: clear headings, subheadings, and content structure
- Spacing consistency: proper margins, padding, and whitespace
- Color harmony: consistent palette, proper contrast, visual balance
- Typography: readable fonts, appropriate sizes, line heights
- Alignment: proper grid alignment, consistent element positioning
- Visual balance: distribution of visual weight across the layout
- Interactive states: hover, focus, active, disabled states
- Responsive design: mobile, tablet, desktop layouts
- Dark/light mode: proper theme implementation

## Output format
- Detailed visual audit report with screenshots (if possible)
- Specific issues with severity ratings (critical, major, minor)
- Concrete recommendations for improvement
- Before/after comparisons when suggesting changes
- Prioritized list of visual fixes

## Failure handling
- If visual issues found, provide specific code fixes
- If accessibility violations detected, escalate to accessibility-review skill
- If responsive issues found, provide breakpoint-specific solutions
- If dark mode issues found, check CSS variable definitions

## Review checklist
### Layout and spacing
- [ ] Consistent padding/margin scale (4px, 8px, 12px, 16px, 24px, 32px, 48px)
- [ ] Proper content width (max-width for readability)
- [ ] Adequate whitespace between sections
- [ ] Responsive grid system working correctly
- [ ] No horizontal scrolling on mobile

### Typography
- [ ] Clear heading hierarchy (h1 > h2 > h3)
- [ ] Readable body text (16px+ for mobile, 18px+ for desktop)
- [ ] Proper line height (1.5-1.7 for body text)
- [ ] Consistent font weights
- [ ] Good contrast for text readability

### Color and contrast
- [ ] Consistent color palette usage
- [ ] Proper contrast ratios (WCAG AA: 4.5:1 for normal text)
- [ ] Visual hierarchy through color
- [ ] Dark mode color scheme working correctly
- [ ] No jarring color combinations

### Interactive elements
- [ ] Clear hover/focus states for buttons
- [ ] Proper cursor types (pointer for clickable elements)
- [ ] Visual feedback for active states
- [ ] Disabled states clearly indicated
- [ ] Loading states for async operations

### Visual polish
- [ ] Consistent border radius usage
- [ ] Subtle shadows for depth
- [ ] Smooth transitions/animations
- [ ] Proper iconography (size, color, alignment)
- [ ] No visual glitches or overlaps

### Responsive design
- [ ] Mobile layout (375px) works correctly
- [ ] Tablet layout (768px) works correctly
- [ ] Desktop layout (1024px+) works correctly
- [ ] Touch targets adequate for mobile (44px+)
- [ ] Images and media scale properly

## Scoring system
- 90-100: Excellent - production ready
- 80-89: Good - minor improvements needed
- 70-79: Fair - several issues to address
- 60-69: Poor - significant improvements needed
- Below 60: Critical - major redesign required

## Common issues and fixes
### Poor visual hierarchy
- Increase heading size differences
- Use font weight variations
- Add more spacing between sections
- Use color to emphasize important elements

### Inconsistent spacing
- Create spacing scale variables
- Use consistent padding/margin values
- Align to grid system
- Use Tailwind spacing utilities

### Color contrast issues
- Check with WebAIM contrast checker
- Adjust text or background colors
- Use darker/lighter variants
- Add text shadows for complex backgrounds

### Responsive problems
- Test on actual devices
- Use mobile-first approach
- Check breakpoint transitions
- Verify touch target sizes

### Dark mode issues
- Test both themes thoroughly
- Check CSS variable definitions
- Verify image/icon visibility
- Test with system preference detection
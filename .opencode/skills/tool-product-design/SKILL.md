---
name: tool-product-design
description: 设计工具产品体验，包括输入、输出、示例、空状态、错误状态、复制、清空、导出
compatibility: opencode
---

# Tool Product Design Skill

## What I do
I design and implement developer tool interfaces that are intuitive, efficient, and provide excellent user experience for technical users.

## When to use me
- When creating new developer tools
- When improving existing tool interfaces
- When designing tool input/output layouts
- When implementing tool-specific features (copy, clear, export, etc.)
- When creating tool documentation and examples

## Required checks
- Clear tool purpose and description
- Intuitive input/output layout
- Helpful placeholder text and examples
- Proper error handling and feedback
- Loading states for async operations
- Success/error notifications
- Mobile-responsive design
- Keyboard shortcuts where appropriate

## Output format
- Complete tool component with all states
- Input validation and error handling
- Copy/clear/export functionality
- Example data for quick testing
- Documentation and usage instructions

## Failure handling
- If tool breaks on invalid input, show helpful error message
- If export fails, provide alternative download methods
- If performance issues, implement pagination or lazy loading
- If accessibility issues, ensure proper ARIA attributes

## Tool design principles
### Clarity
- Clear tool name and description
- Obvious input/output areas
- Helpful placeholder text
- Visual hierarchy of information

### Efficiency
- Minimal clicks to complete task
- Keyboard shortcuts for power users
- Auto-save where appropriate
- Quick access to common operations

### Feedback
- Loading indicators for async operations
- Success/error messages
- Progress indicators for long operations
- Clear validation messages

### Flexibility
- Multiple input methods (text, file, URL)
- Various output formats
- Customizable options
- Export in different formats

## Tool states
### Empty state
- Clear instructions
- Example data to try
- Getting started guide
- Visual placeholder

### Input state
- Clear input labels
- Placeholder text
- Validation feedback
- Character/line counts
- Clear button

### Processing state
- Loading spinner
- Progress bar (if applicable)
- Cancel button
- Estimated time

### Success state
- Clear output display
- Copy button
- Download button
- Share options
- Clear/reset button

### Error state
- Clear error message
- Suggested fixes
- Retry button
- Contact support link

## Common tool features
### Input features
- Text area with syntax highlighting
- File upload with drag & drop
- URL input with validation
- JSON/YAML/CSV formatting
- Line numbers
- Word wrap toggle
- Clear button
- Paste from clipboard

### Output features
- Syntax highlighted code
- Line numbers
- Copy button
- Download button
- Print button
- Fullscreen toggle
- Diff view (for comparison tools)

### Utility features
- Undo/redo
- History
- Favorites/bookmarks
- Share via URL
- Export settings
- Import settings
- Keyboard shortcuts

## Tool categories
### Data transformation
- JSON Formatter
- CSV to JSON
- YAML to JSON
- XML to JSON
- Base64 Encoder/Decoder
- URL Encoder/Decoder

### Text processing
- Regex Tester
- Text Utilities
- Lorem Ipsum Generator
- Markdown Previewer
- Case Converter

### Developer utilities
- UUID Generator
- Hash Generator
- JWT Decoder
- Cron Expression Helper
- CSS Unit Converter

### Design tools
- Color Palette Generator
- Gradient Generator
- Shadow Generator
- Border Radius Generator

## Input validation
### Real-time validation
- Syntax errors highlighted
- Character limits enforced
- Format requirements shown
- Validation messages clear

### Error messages
- Specific error descriptions
- Suggested corrections
- Error location highlighted
- Help documentation linked

## Output presentation
### Code output
- Syntax highlighting
- Line numbers
- Copy button
- Download button
- Diff view (before/after)

### Data output
- Collapsible sections
- Search/filter
- Sort options
- Pagination for large datasets

### Visual output
- Charts and graphs
- Color previews
- Image previews
- Interactive elements

## Mobile considerations
- Touch-friendly controls
- Adequate tap targets (44px+)
- Responsive layout
- Simplified interface on small screens
- Swipe gestures where appropriate

## Performance considerations
- Lazy load heavy components
- Debounce expensive operations
- Web Workers for CPU-intensive tasks
- Virtual scrolling for large lists
- Caching for repeated operations

## Accessibility requirements
- Keyboard navigable
- Screen reader friendly
- High contrast support
- Focus management
- ARIA labels for controls
- Error announcements

## Example tool template
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Tool Name - MIMO">
  <main class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Tool header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Tool Name</h1>
        <p class="text-muted-foreground">Tool description</p>
      </div>

      <!-- Input section -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Input</label>
        <textarea 
          class="w-full h-64 p-4 border rounded-lg font-mono text-sm"
          placeholder="Enter your text here..."
        ></textarea>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2 mb-6">
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded">
          Process
        </button>
        <button class="px-4 py-2 border rounded">
          Clear
        </button>
        <button class="px-4 py-2 border rounded">
          Copy
        </button>
      </div>

      <!-- Output section -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Output</label>
        <div class="w-full h-64 p-4 border rounded-lg bg-muted font-mono text-sm overflow-auto">
          Output will appear here...
        </div>
      </div>

      <!-- Examples section -->
      <div>
        <h3 class="font-medium mb-2">Examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button class="p-3 border rounded text-left text-sm hover:bg-muted">
            Example 1: Simple JSON
          </button>
          <button class="p-3 border rounded text-left text-sm hover:bg-muted">
            Example 2: Nested JSON
          </button>
        </div>
      </div>
    </div>
  </main>
</Layout>
```
# RustyUI

A lightweight, modern UI framework built from scratch using vanilla JavaScript. No dependencies, no build tools required.

## Features

- 🚀 **Lightweight** - Less than 10KB gzipped
- ⚡ **Fast** - Direct DOM manipulation, no virtual DOM overhead
- 🎨 **Beautiful** - Modern, polished components with smooth animations
- 🔧 **Customizable** - Easy to style and extend
- 📦 **Zero Dependencies** - Pure vanilla JavaScript
- 🎯 **Simple API** - Intuitive and easy to learn

## Installation

```bash
npm install rustyui
```

Or use it directly in your browser with ES modules:

```html
<script type="module">
  import { Button, Card, Input, Modal, Alert } from './src/index.js';
</script>
```

## Quick Start

### Buttons

```javascript
import { Button } from 'rustyui';

// Basic button
const button = new Button({ 
  children: 'Click me',
  onClick: () => alert('Hello!')
});
button.mount(document.getElementById('app'));

// Button variants
Button.success({ children: 'Success', onClick: handleSuccess });
Button.danger({ children: 'Delete', onClick: handleDelete });
Button.secondary({ children: 'Cancel', onClick: handleCancel });
```

### Input Fields

```javascript
import { Input } from 'rustyui';

const input = new Input({
  label: 'Email',
  type: 'email',
  placeholder: 'you@example.com',
  onChange: (e) => console.log(e.target.value)
});
input.mount(document.getElementById('form'));

// Validation
input.setError('Invalid email address');
input.clearError();
```

### Cards

```javascript
import { Card } from 'rustyui';

const card = new Card({ maxWidth: '400px' });
card.addHeader('Card Title');
card.element.innerHTML += '<p>Card content goes here...</p>';
card.addFooter('Footer content');
card.mount(document.getElementById('container'));
```

### Modals

```javascript
import { Modal, Button } from 'rustyui';

const modal = new Modal({
  title: 'Confirmation',
  maxWidth: '500px'
});

modal.setContent('Are you sure you want to proceed?');

// Open modal
modal.show();

// Close modal
modal.hide();
```

### Alerts

```javascript
import { Alert } from 'rustyui';

// Different alert types
Alert.info({ message: 'Heads up!', dismissible: true });
Alert.success({ message: 'Well done!', dismissible: true });
Alert.warning({ message: 'Warning!', dismissible: true });
Alert.error({ message: 'Oh no!', dismissible: true });
```

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Interactive button with multiple variants |
| `Card` | Content container with header and footer |
| `Input` | Form input with validation support |
| `Modal` | Overlay dialog for important content |
| `Alert` | Notification messages with auto-dismiss |

## API Reference

### Component Base Class

All components extend the base `Component` class which provides:

- `mount(container)` - Render component to DOM
- `unmount()` - Remove component from DOM
- `updateProps(props)` - Update component properties
- `setAttribute(name, value)` - Set HTML attribute
- `addEvent(type, handler)` - Add event listener

### Creating Custom Components

```javascript
import { Component } from 'rustyui';

class CustomComponent extends Component {
  constructor(props = {}) {
    super(props);
    this.createElement('div');
    
    // Add your custom styles and logic
    this.element.style.cssText = `
      /* your styles */
    `;
  }
  
  // Add custom methods
  customMethod() {
    // your logic
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © RustyUI
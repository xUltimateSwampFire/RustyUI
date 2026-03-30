// Button Component
import { Component } from '../core.js';

export class Button extends Component {
  constructor(props = {}) {
    super(props);
    this.createElement('button');
    
    // Add default button styles
    const defaultStyles = {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.1s',
      ...props.style
    };
    
    Object.assign(this.element.style, defaultStyles);
    
    // Set button text
    if (props.children) {
      this.element.textContent = props.children;
    }
    
    // Add click handler if provided
    if (props.onClick) {
      this.addEvent('click', props.onClick);
    }
    
    // Add hover effects
    this.addEvent('mouseenter', () => {
      this.element.style.backgroundColor = '#0056b3';
      this.element.style.transform = 'translateY(-1px)';
    });
    
    this.addEvent('mouseleave', () => {
      this.element.style.backgroundColor = defaultStyles.backgroundColor;
      this.element.style.transform = 'translateY(0)';
    });
  }
  
  setDisabled(disabled) {
    this.element.disabled = disabled;
    this.element.style.opacity = disabled ? '0.6' : '1';
    this.element.style.cursor = disabled ? 'not-allowed' : 'pointer';
    return this;
  }
}

// Variants
Button.primary = (props) => new Button({ 
  ...props, 
  style: { ...props.style, backgroundColor: '#007bff' } 
});

Button.success = (props) => new Button({ 
  ...props, 
  style: { ...props.style, backgroundColor: '#28a745' } 
});

Button.danger = (props) => new Button({ 
  ...props, 
  style: { ...props.style, backgroundColor: '#dc3545' } 
});

Button.secondary = (props) => new Button({ 
  ...props, 
  style: { ...props.style, backgroundColor: '#6c757d' } 
});

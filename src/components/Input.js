// Input Component
import { Component } from '../core.js';

export class Input extends Component {
  constructor(props = {}) {
    super(props);
    
    // Create wrapper div
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = 'margin-bottom: 16px; position: relative;';
    
    // Create label if provided
    if (props.label) {
      this.label = document.createElement('label');
      this.label.textContent = props.label;
      this.label.style.cssText = `
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
      `;
      this.wrapper.appendChild(this.label);
    }
    
    // Create input element
    this.createElement('input');
    
    // Set input type
    this.element.type = props.type || 'text';
    
    // Add default input styles
    const defaultStyles = {
      width: '100%',
      padding: '12px 16px',
      fontSize: '14px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box',
      ...props.style
    };
    
    Object.assign(this.element.style, defaultStyles);
    
    // Set placeholder
    if (props.placeholder) {
      this.element.placeholder = props.placeholder;
    }
    
    // Set value
    if (props.value !== undefined) {
      this.element.value = props.value;
    }
    
    // Add focus effects
    this.addEvent('focus', () => {
      this.element.style.borderColor = '#007bff';
      this.element.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.15)';
    });
    
    this.addEvent('blur', () => {
      this.element.style.borderColor = '#e5e7eb';
      this.element.style.boxShadow = 'none';
    });
    
    // Add change handler if provided
    if (props.onChange) {
      this.addEvent('change', props.onChange);
      this.addEvent('input', props.onChange);
    }
    
    // Add error state styles
    if (props.error) {
      this.setError(props.error);
    }
    
    this.wrapper.appendChild(this.element);
  }
  
  setValue(value) {
    this.element.value = value;
    return this;
  }
  
  getValue() {
    return this.element.value;
  }
  
  setError(message) {
    this.element.style.borderColor = '#dc3545';
    
    // Remove existing error message if any
    const existingError = this.wrapper.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    errorEl.style.cssText = `
      color: #dc3545;
      font-size: 12px;
      margin-top: 6px;
    `;
    this.wrapper.appendChild(errorEl);
    
    return this;
  }
  
  clearError() {
    this.element.style.borderColor = '#e5e7eb';
    const errorEl = this.wrapper.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
    return this;
  }
  
  mount(container) {
    if (container) {
      container.appendChild(this.wrapper);
    }
    return this;
  }
}

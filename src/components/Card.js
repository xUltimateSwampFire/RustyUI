// Card Component
import { Component } from '../core.js';

export class Card extends Component {
  constructor(props = {}) {
    super(props);
    this.createElement('div');
    
    // Add default card styles
    const defaultStyles = {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      padding: props.padding || '24px',
      transition: 'box-shadow 0.3s, transform 0.2s',
      maxWidth: props.maxWidth || '400px',
      ...props.style
    };
    
    Object.assign(this.element.style, defaultStyles);
    
    // Add hover effect if not disabled
    if (props.hoverable !== false) {
      this.addEvent('mouseenter', () => {
        this.element.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)';
        this.element.style.transform = 'translateY(-4px)';
      });
      
      this.addEvent('mouseleave', () => {
        this.element.style.boxShadow = defaultStyles.boxShadow;
        this.element.style.transform = 'translateY(0)';
      });
    }
  }
  
  addHeader(content) {
    const header = document.createElement('div');
    header.style.cssText = `
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e9ecef;
    `;
    header.textContent = content;
    this.element.insertBefore(header, this.element.firstChild);
    return this;
  }
  
  addFooter(content) {
    const footer = document.createElement('div');
    footer.style.cssText = `
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e9ecef;
      color: #6c757d;
      font-size: 14px;
    `;
    footer.appendChild(typeof content === 'string' ? document.createTextNode(content) : content);
    this.element.appendChild(footer);
    return this;
  }
}

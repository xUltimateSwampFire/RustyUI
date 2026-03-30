// Alert Component
import { Component } from '../core.js';

export class Alert extends Component {
  constructor(props = {}) {
    super(props);
    this.createElement('div');
    
    const type = props.type || 'info';
    const variants = {
      info: { bg: '#e7f3ff', border: '#b3d9ff', text: '#004085', icon: 'ℹ️' },
      success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724', icon: '✓' },
      warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404', icon: '⚠️' },
      error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24', icon: '✕' }
    };
    
    const variant = variants[type] || variants.info;
    
    // Add default alert styles
    const defaultStyles = {
      padding: '16px 20px',
      backgroundColor: variant.bg,
      border: `1px solid ${variant.border}`,
      borderLeft: `4px solid ${variant.border}`,
      borderRadius: '8px',
      color: variant.text,
      fontSize: '14px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
      animation: 'slideIn 0.3s ease',
      ...props.style
    };
    
    Object.assign(this.element.style, defaultStyles);
    
    // Add icon
    const iconEl = document.createElement('span');
    iconEl.textContent = variant.icon;
    iconEl.style.fontSize = '18px';
    this.element.appendChild(iconEl);
    
    // Add message
    const messageEl = document.createElement('span');
    messageEl.textContent = props.message || props.children || '';
    messageEl.style.flex = '1';
    this.element.appendChild(messageEl);
    
    // Add close button if dismissible
    if (props.dismissible) {
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: ${variant.text};
        opacity: 0.7;
        padding: 0 4px;
        line-height: 1;
      `;
      
      closeBtn.addEventListener('click', () => {
        this.element.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (this.props.onClose) {
            this.props.onClose();
          }
          this.unmount();
        }, 300);
      });
      
      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
      });
      
      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
      });
      
      this.element.appendChild(closeBtn);
    }
  }
  
  static info(props) {
    return new Alert({ ...props, type: 'info' });
  }
  
  static success(props) {
    return new Alert({ ...props, type: 'success' });
  }
  
  static warning(props) {
    return new Alert({ ...props, type: 'warning' });
  }
  
  static error(props) {
    return new Alert({ ...props, type: 'error' });
  }
}

// Add animations to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);
}

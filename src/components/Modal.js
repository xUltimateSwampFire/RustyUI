// Modal Component
import { Component } from '../core.js';

export class Modal extends Component {
  constructor(props = {}) {
    super(props);
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    this.createElement('div');
    this.element.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: ${props.padding || '24px'};
      max-width: ${props.maxWidth || '500px'};
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      transform: scale(0.9) translateY(-20px);
      transition: transform 0.3s ease;
    `;
    
    // Add close button if not disabled
    if (props.showClose !== false) {
      this.closeButton = document.createElement('button');
      this.closeButton.innerHTML = '&times;';
      this.closeButton.style.cssText = `
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        padding: 4px;
        line-height: 1;
      `;
      
      this.closeButton.addEventListener('mouseenter', () => {
        this.closeButton.style.color = '#1a1a1a';
      });
      
      this.closeButton.addEventListener('mouseleave', () => {
        this.closeButton.style.color = '#6b7280';
      });
      
      this.closeButton.addEventListener('click', () => this.hide());
      this.element.style.position = 'relative';
      this.element.appendChild(this.closeButton);
    }
    
    this.overlay.appendChild(this.element);
    
    // Add title if provided
    if (props.title) {
      this.setTitle(props.title);
    }
    
    // Close on overlay click
    if (props.closeOnOverlayClick !== false) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.hide();
        }
      });
    }
    
    // Handle ESC key
    this.handleEsc = (e) => {
      if (e.key === 'Escape' && props.closeOnEsc !== false) {
        this.hide();
      }
    };
  }
  
  setTitle(title) {
    const existingTitle = this.element.querySelector('.modal-title');
    if (existingTitle) {
      existingTitle.remove();
    }
    
    const titleEl = document.createElement('h2');
    titleEl.className = 'modal-title';
    titleEl.textContent = title;
    titleEl.style.cssText = `
      margin: 0 0 16px 0;
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
    `;
    
    if (this.closeButton) {
      this.element.insertBefore(titleEl, this.closeButton);
    } else {
      this.element.insertBefore(titleEl, this.element.firstChild);
    }
    
    return this;
  }
  
  setContent(content) {
    // Remove existing content (except title and close button)
    const existingContent = this.element.querySelector('.modal-content');
    if (existingContent) {
      existingContent.remove();
    }
    
    const contentEl = document.createElement('div');
    contentEl.className = 'modal-content';
    
    if (typeof content === 'string') {
      contentEl.textContent = content;
    } else if (content instanceof HTMLElement) {
      contentEl.appendChild(content);
    } else if (content instanceof Component) {
      contentEl.appendChild(content.element);
    }
    
    contentEl.style.cssText = `
      color: #374151;
      line-height: 1.6;
    `;
    
    this.element.appendChild(contentEl);
    return this;
  }
  
  show() {
    document.body.appendChild(this.overlay);
    document.addEventListener('keydown', this.handleEsc);
    
    // Trigger animation
    setTimeout(() => {
      this.overlay.style.opacity = '1';
      this.element.style.transform = 'scale(1) translateY(0)';
    }, 10);
    
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    
    return this;
  }
  
  hide() {
    this.overlay.style.opacity = '0';
    this.element.style.transform = 'scale(0.9) translateY(-20px)';
    
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      document.removeEventListener('keydown', this.handleEsc);
      
      if (this.props.onClose) {
        this.props.onClose();
      }
    }, 300);
    
    return this;
  }
  
  mount(container) {
    // Modal doesn't use traditional mounting
    return this;
  }
}

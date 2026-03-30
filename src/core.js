// RustyUI Core - A lightweight UI framework built from scratch

/**
 * Base Component Class
 * All UI components extend this base class
 */
export class Component {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
    this.children = [];
    this.eventListeners = new Map();
  }

  createElement(tag) {
    const element = document.createElement(tag);
    if (this.props.className) {
      element.className = this.props.className;
    }
    if (this.props.id) {
      element.id = this.props.id;
    }
    if (this.props.style) {
      Object.assign(element.style, this.props.style);
    }
    this.element = element;
    return element;
  }

  addEvent(eventType, handler) {
    if (this.element) {
      this.element.addEventListener(eventType, handler);
      this.eventListeners.set(eventType, handler);
    }
    return this;
  }

  appendChild(child) {
    if (child instanceof Component) {
      this.children.push(child);
      if (this.element && child.element) {
        this.element.appendChild(child.element);
      }
    } else if (typeof child === 'string' || typeof child === 'number') {
      const textNode = document.createTextNode(String(child));
      if (this.element) {
        this.element.appendChild(textNode);
      }
    }
    return this;
  }

  mount(container) {
    if (this.element && container) {
      container.appendChild(this.element);
    }
    return this;
  }

  unmount() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.eventListeners.forEach((handler, eventType) => {
      this.element?.removeEventListener(eventType, handler);
    });
    this.eventListeners.clear();
    return this;
  }

  setAttribute(name, value) {
    if (this.element) {
      this.element.setAttribute(name, value);
    }
    return this;
  }

  updateProps(newProps) {
    this.props = { ...this.props, ...newProps };
    if (newProps.className && this.element) {
      this.element.className = newProps.className;
    }
    if (newProps.style && this.element) {
      Object.assign(this.element.style, newProps.style);
    }
    return this;
  }
}

/**
 * Create a component instance
 */
export function h(ComponentClass, props, ...children) {
  const component = new ComponentClass(props || {});
  children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(c => component.appendChild(c));
    } else {
      component.appendChild(child);
    }
  });
  return component;
}

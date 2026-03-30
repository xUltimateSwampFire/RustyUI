// Main entry point - Export all components
export { Component, h } from './core.js';
export { Button } from './components/Button.js';
export { Card } from './components/Card.js';
export { Input } from './components/Input.js';
export { Modal } from './components/Modal.js';
export { Alert } from './components/Alert.js';

/**
 * RustyUI - A lightweight UI framework built from scratch
 * 
 * Usage:
 * import { Button, Card, Input, Modal, Alert } from 'rustyui';
 * 
 * const button = new Button({ children: 'Click me', onClick: () => alert('Hello!') });
 * button.mount(document.getElementById('app'));
 */

class FarmArea {
    constructor() {
        this.element = this.generateElement();
    }

    generateElement() {

    }

    addToDocument(targetElement) {
        targetElement.appendChild(this.element);
    }

    removeFromDocument() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    setupEventListeners() {

    }
}
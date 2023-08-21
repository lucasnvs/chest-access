import { Table } from "./table.js";

export class FarmArea {
    constructor(data = [], total, logsUnder) {
        this.data = data || [];
        this.total = total;
        this.owner = data[0]["PASSAPORTE"];
        this.logsUnder = logsUnder;
        this.element = this.generateElement();
    }

    generateElement() {
        const farmAreaDiv = document.createElement("div");
        farmAreaDiv.className = "farm-area";
        
        const divMessage1 = document.createElement("div");
        divMessage1.className = "div-message";
        
        const p1 = document.createElement("p");
        p1.textContent = "DEPÓSITOS DE MENOS DE 40x Folha de Coca NÃO FORAM CONTADOS! Total de depósitos com menos de 40x Folha de Coca: ";
        
        const span1 = document.createElement("span");
        span1.textContent = this.logsUnder;
        p1.appendChild(span1);
        
        divMessage1.appendChild(p1);
        farmAreaDiv.appendChild(divMessage1);
        
        const divMessage2 = document.createElement("div");
        divMessage2.className = "div-message";
        
        const p2 = document.createElement("p");
        
        const span2_1 = document.createElement("span");
        span2_1.textContent = this.owner;
        
        const span2_2 = document.createElement("span");
        span2_2.textContent = this.total+"x";
        
        p2.appendChild(span2_1);
        p2.appendChild(document.createTextNode(" depositou o total de Folha de Coca no Baú: "));
        p2.appendChild(span2_2);
        
        divMessage2.appendChild(p2);
        farmAreaDiv.appendChild(divMessage2);
        new Table(this.data).addToDocument(farmAreaDiv);
        
        return farmAreaDiv;
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
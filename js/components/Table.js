export class Table {
    constructor(data) {
        this.data = data;
        this.header = Object.keys(this.data[0]);
        console.log(this.header)
        this.element = this.generateElement();
        this.setData(this.data);
    }

    generateElement() {
        let divTabelaInteira = document.createElement("div");
        divTabelaInteira.className = "tabela";

        let ths = this.header.map( head => {
            let th = document.createElement("th");
            th.textContent = head;
            return th;
        });
        const thead = document.createElement("div");
        thead.className = "thead";
        ths.forEach( th => thead.appendChild(th));

        let table_container = document.createElement("div");
        table_container.className = "table-container";
        let tbody = document.createElement("tbody");
        tbody.className = "tbody";

        table_container.appendChild(tbody);
        divTabelaInteira.appendChild(thead);
        divTabelaInteira.appendChild(table_container);
        return divTabelaInteira;
    }

    addToDocument(targetElement) {
        targetElement.appendChild(this.element);
    }

    removeFromDocument() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    setData(data) {
        this.data = data;
        let el = this.element.querySelector(".tbody");
        el.textContent = "";
        this.data.forEach( item => {
            let tr = document.createElement("tr");
    
            this.header.forEach( head => {
                let td = document.createElement("td");
                td.textContent = item[head];
                tr.appendChild(td);
            })
    
            el.appendChild(tr);
        })
    }
    
    setupEventListeners() {

    }
}
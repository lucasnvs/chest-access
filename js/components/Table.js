export class Table {
    constructor(data) {
        if(data != null) {
            this.data = data;
            this.element = this.generateElement();
            this.setData(this.data);
        } else {
            this.data = [{ SEM: "", DADOS: "", SEM: "", DADOS: ""}];
            this.element = this.generateElement();
            this.setData(this.data);
        }
    }

    generateElement() {
        let header = Object.keys(this.data[0]);

        let divTabelaInteira = document.createElement("div");
        divTabelaInteira.className = "tabela";

        let ths = header.map( head => {
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

        if(this.element) {
            let el = this.element.querySelector(".tabela");
            el.textContent = "";
            el.appendChild(thead);
            el.appendChild(table_container);
            return;
        }

        return divTabelaInteira;
    }

    addToDocument(targetElement) {
        if(this.element == null) return;

        targetElement.appendChild(this.element);
    }

    removeFromDocument() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    setData(data) {
        this.data = data;
        let header = Object.keys(this.data[0]);


        let elHeader = this.element.querySelector(".thead");
        elHeader.textContent = "";
        let ths = header.map( head => {
            let th = document.createElement("th");
            th.textContent = head;
            return th;
        });
        ths.forEach( th => elHeader.appendChild(th));

        let el = this.element.querySelector(".tbody");
        el.textContent = "";
        this.data.forEach( item => {
            let tr = document.createElement("tr");
    
            header.forEach( head => {
                let td = document.createElement("td");
                td.textContent = item[head];
                tr.appendChild(td);
            })
    
            el.appendChild(tr);
        })
    }
    
    setupEventListeners() {}
}
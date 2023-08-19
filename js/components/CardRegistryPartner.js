import { renderSelect } from "../index.js";

export class CardRegistryPartner {
    constructor(title) {
        this.title = title;
        this.element = this.generateElement();
        this.setupEventListeners();
    }

    generateElement() {
        const div = document.createElement("div");
        div.className = "frame";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card-registry-partner";

        const containerTopDiv = document.createElement("div");
        containerTopDiv.className = "container-card-top";

        const titleHeader = document.createElement("h3");
        titleHeader.className = "card-title";
        titleHeader.textContent = this.title;

        const closeButton = document.createElement("button");
        closeButton.id = "card-close";
        closeButton.textContent = "X";

        containerTopDiv.appendChild(titleHeader);
        containerTopDiv.appendChild(closeButton);

        const inputContainerDiv = document.createElement("div");
        inputContainerDiv.className = "input-container";

        const idNameLabel = document.createElement("label");
        idNameLabel.setAttribute("for", "partner-idname");
        idNameLabel.textContent = "Id e Nome:";

        const idNameInput = document.createElement("input");
        idNameInput.id = "partner-idname";
        idNameInput.type = "text";
        idNameInput.placeholder = "Ex.: 3029 Brito Triunfo";

        inputContainerDiv.appendChild(idNameLabel);
        inputContainerDiv.appendChild(idNameInput);

        const addButton = document.createElement("button");
        addButton.id = "add-registry-partner";
        addButton.className = "btn";
        addButton.textContent = "Salvar";

        cardDiv.appendChild(containerTopDiv);
        cardDiv.appendChild(inputContainerDiv);
        cardDiv.appendChild(addButton);

        div.appendChild(cardDiv);

        return div;
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
        const closeButton = this.element.querySelector("#card-close");
        const addButton = this.element.querySelector("#add-registry-partner");

        closeButton.addEventListener("click", () => {
            this.removeFromDocument();
        });

        addButton.addEventListener("click", () => {
            let valorInput = this.element.querySelector("#partner-idname").value;
            localStorage.set("partners", { partner: valorInput });
            this.removeFromDocument();
            renderSelect();
        });
    }
}
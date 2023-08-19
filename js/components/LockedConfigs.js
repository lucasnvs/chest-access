export class LockedConfigs {
    constructor() {
        this.element = this.generateElement();
        this.setupEventListeners();
    }

    generateElement() {
        const topConfigDiv = document.createElement("div");
        topConfigDiv.classList.add("top-config");

        const tokenInputContainer = document.createElement("div");
        tokenInputContainer.classList.add("input-container");
        const tokenLabel = document.createElement("label");
        tokenLabel.setAttribute("for", "token");
        tokenLabel.textContent = "TOKEN DE USUÁRIO:";
        const tokenInput = document.createElement("input");
        tokenInput.setAttribute("id", "token");
        tokenInput.setAttribute("type", "text");
        tokenInput.setAttribute("placeholder", "Seu token de usuário aqui...");
        tokenInputContainer.appendChild(tokenLabel);
        tokenInputContainer.appendChild(tokenInput);

        const idBauInputContainer = document.createElement("div");
        idBauInputContainer.classList.add("input-container");
        const idBauLabel = document.createElement("label");
        idBauLabel.setAttribute("for", "id-bau");
        idBauLabel.textContent = "ID DO CHAT DE BAU:";
        const idBauInput = document.createElement("input");
        idBauInput.setAttribute("id", "id-bau");
        idBauInput.setAttribute("type", "text");
        idBauInput.setAttribute("placeholder", "Seu ID do baú aqui...");
        idBauInputContainer.appendChild(idBauLabel);
        idBauInputContainer.appendChild(idBauInput);

        const idInitMessageInputContainer = document.createElement("div");
        idInitMessageInputContainer.classList.add("input-container");
        const idInitMessageLabel = document.createElement("label");
        idInitMessageLabel.setAttribute("for", "id-init-message");
        idInitMessageLabel.textContent = "ID MENSAGEM DE INICIO:";
        const idInitMessageInput = document.createElement("input");
        idInitMessageInput.setAttribute("id", "id-init-message");
        idInitMessageInput.setAttribute("type", "text");
        idInitMessageInput.setAttribute("placeholder", "Seu ID de mensagem inicial...");
        idInitMessageInputContainer.appendChild(idInitMessageLabel);
        idInitMessageInputContainer.appendChild(idInitMessageInput);

        const containerBtnsDiv = document.createElement("div");
        containerBtnsDiv.classList.add("container-btns");
        const lockConfigButton = document.createElement("button");
        lockConfigButton.setAttribute("id", "lock-config");
        lockConfigButton.classList.add("btn");
        const lockIcon = document.createElement("img");
        lockIcon.setAttribute("src", "assets/icons/lock-closed-outline.svg");
        lockConfigButton.appendChild(lockIcon);
        const saveConfigButton = document.createElement("button");
        saveConfigButton.setAttribute("id", "save-config");
        saveConfigButton.classList.add("btn");
        saveConfigButton.textContent = "Salvar";
        containerBtnsDiv.appendChild(lockConfigButton);
        containerBtnsDiv.appendChild(saveConfigButton);

        topConfigDiv.appendChild(tokenInputContainer);
        topConfigDiv.appendChild(idBauInputContainer);
        topConfigDiv.appendChild(idInitMessageInputContainer);
        topConfigDiv.appendChild(containerBtnsDiv);

        return topConfigDiv;
    }

    addToDocument(targetElement) {
        targetElement.appendChild(this.element);
    }

    removeFromDocument() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    toggleLock() {
        const inputToken = this.element.querySelector("token");
        const inputIDBAU = this.element.querySelector("id-bau");
        const inputID_INIT = this.element.querySelector("id-init-message");

        /// finish
    }

    setupEventListeners() {
        const btn_save = this.element.querySelector("save-config");

        btn_save.addEventListener("click", () => {
            toggleLock()
        })
    }
}
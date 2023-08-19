import { CardRegistryPartner } from "./components/CardRegistryPartner.js";
import { Table } from "./components/table.js";
import { getPersonLog } from "./request/search.js";
import { personIdName } from "./request/config.js";
import { SETTED_LAST_ID_MESSAGE, setLastId } from "./request/fetch.js";
import { LockedConfigs } from "./components/LockedConfigs.js";

const main = document.getElementById("main");
const sidebar = document.querySelector(".sidebar");

var valor = [
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
    { ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023" },
]

var element = document.getElementById("identity-select");

export const renderSelect = () => {
    element.textContent = "";

    var partnerList = localStorage.get("partners");
    let option = document.createElement("option");
    option.value = "all";
    option.text = "Todos";
    element.appendChild(option)
    partnerList.forEach(person => {
        let option = document.createElement("option");
        option.value = person.partner;
        option.text = person.partner;
    
        element.appendChild(option);
    })
}

renderSelect();
const config_locker = new LockedConfigs();
config_locker.addToDocument(sidebar);

const table_principal = new Table(valor);
table_principal.addToDocument(main);

document.getElementById("btn-search-table").addEventListener("click", async () => {
    let person = await getPersonLog(element.value);
    table_principal.setData(person);
    setLastId(SETTED_LAST_ID_MESSAGE);
})

document.getElementById("registry-partner").addEventListener("click", () => {
    const cardRegistry = new CardRegistryPartner("Registrar Parceiro:");
    cardRegistry.addToDocument(document.body);
});
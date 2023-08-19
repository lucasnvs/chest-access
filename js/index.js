import { CardRegistryPartner } from "./components/CardRegistryPartner.js";
import { Table } from "./components/table.js";
import { getPersonLog } from "./request/search.js";
import { personIdName } from "./request/config.js";
import { SETTED_LAST_ID_MESSAGE, setLastId } from "./request/fetch.js";
const main = document.getElementById("main");

var valor = [
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
    {ACTION: "GUARDOU", PASSAPORTE: "3029 Brito Triunfo", ITEM: "30x RepairKit", BAU: "chest:BALLAS", DATA: "17/08/2023"},
]

var personList = [
    "3029 Brito Triunfo",
    "131 Matheus Arantes",
    "3028 Matheus Triunfo",
    "389 Ed Sena",
]

const table_principal = new Table(valor);
table_principal.addToDocument(main);

let element = document.getElementById("identity-select");
    personList.forEach( person => {
        let option = document.createElement("option");
        option.value = person;
        option.text = person;

        element.appendChild(option);
    })

    document.getElementById("btn-search-table").addEventListener("click", async () => {
        let person = await getPersonLog(element.value);
        table_principal.setData(person);
        setLastId(SETTED_LAST_ID_MESSAGE);
    })

document.getElementById("registry-partner").addEventListener("click", () => {
    const cardRegistry = new CardRegistryPartner("Registrar Parceiro:");
    cardRegistry.addToDocument(document.body);
});
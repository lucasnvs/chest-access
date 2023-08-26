import { CardRegistryPartner } from "./components/CardRegistryPartner.js";
import { Table } from "./components/Table.js";
import { getPersonLog, getSomaItem } from "./request/search.js";
import { SETTED_LAST_ID_MESSAGE, setLastId } from "./request/fetch.js";
import { LockedConfigs } from "./components/LockedConfigs.js";
import { FarmArea } from "./components/FarmArea.js";

const main = document.getElementById("main");
const tablepos = document.querySelector(".cont");
const table_info = document.querySelector(".table-info-selected");
const sidebar = document.querySelector(".sidebar");

var element = document.getElementById("identity-select");

export const renderSelect = () => {
    element.textContent = "";

    var partnerList = localStorage.get("partners") || [];
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

const isLocked = localStorage.get("config") != null;
const config_locker = new LockedConfigs(isLocked);
config_locker.addToDocument(sidebar);

const table_principal = new Table();
table_principal.addToDocument(tablepos);

var _LOG = [];
function getLOG() {
    return _LOG;
}

export function setLOG(log) {
    _LOG = log;
}

var personLOG = [];

document.getElementById("btn-search-table").addEventListener("click", async () => {
    console.log(_LOG)
    console.log(element.value)
    personLOG = await getPersonLog(element.value, getLOG());
    console.log(personLOG)
    if(personLOG.length > 0) {
        table_principal.setData(personLOG);
    } else {
        alert(element.value + " não adicionou nada no baú!");
    }
    setLastId(SETTED_LAST_ID_MESSAGE);
})

document.getElementById("get-farm").addEventListener("click", async () => {
    let area = table_info.querySelector(".farm-area");
    if(area) {
        area.remove();
    }

    let farm = getSomaItem(personLOG);
    if(farm.data.length > 0) {
        var farm_area = new FarmArea(farm.data, farm.total, farm.logsUnder);
        farm_area.addToDocument(table_info);
    } else {
        alert("Jogador não adicionou FARM ao baú!");
    }

});

document.getElementById("registry-partner").addEventListener("click", () => {
    const cardRegistry = new CardRegistryPartner("Registrar Parceiro:");
    cardRegistry.addToDocument(document.body);
});
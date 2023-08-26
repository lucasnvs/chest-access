import { setLOG } from "../index.js";
import { GET_ALL_LOG } from "./fetch.js";
import { mapItem } from "./mapper.js";
var ITEM_SEARCHED = "Peça de Arma"; // fazer choice

export async function getPersonLog(idName, all) {
    if(all.length <= 0) {
        console.log("entrou")
        all = await GET_ALL_LOG({ security: false, limit: 100});
        setLOG(all);
    }
    console.log(all.length)
    console.log(all)

    if(idName == "all") {
        return all;
    }
    let personLOG = all.filter(log => log["PASSAPORTE"] == idName) // seletor de pessoa
    return personLOG;
} 

export function getSomaItem(personLOG) {
    let somaItem = 0;
    let logsMenos40 = 0;
    let request = personLOG;

    let retiradaSemente = request.filter(item => item["ACTION"] === "GUARDOU" && mapItem(item["ITEM"])[1] === ITEM_SEARCHED);
    retiradaSemente.forEach(item => {
        let val = mapItem(item["ITEM"])[0];

        if (val >= 40) {
            somaItem += val;
        } else {
            logsMenos40++;
            somaItem += 0;
        }
    })
    return {total: somaItem, data: retiradaSemente, logsUnder: logsMenos40};
}
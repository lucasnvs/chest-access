import { seeAll } from "./config.js";
import { requestALL } from "./fetch.js";
import { mapItem } from "./mapper.js";
var ITEM_SEARCHED = "Peça de Arma"; // fazer choice

export async function getPersonLog(idName) {
    let all = await requestALL({ security: false, limit: 100});
    if(idName == "all") {
        return all;
    }
    let personLOG = all.filter(log => log["PASSAPORTE"] == idName) // seletor de pessoa
    seeAll ? console.log("Todos Logs de: "+idName) : "";
    seeAll ? console.table(personLOG) : "";
    return personLOG;
} 

export async function getSomaItem(person) {
    let somaItem = 0;
    let logsMenos40 = 0;
    let request = await getPersonLog(person);

    let retiradaSemente = request.filter(item => item["ACTION"] === "GUARDOU" && mapItem(item["ITEM"])[1] === ITEM_SEARCHED);
    console.log(`GUARDANDO ${ITEM_SEARCHED.toUpperCase()}:`)
    console.table(retiradaSemente)
    if(retiradaSemente.length === 0) console.log(`!!!!!!!!!!!!! ${person} NÃO GUARDOU nenhuma ${ITEM_SEARCHED} no baú até aonde foi lido.`)
    retiradaSemente.forEach(item => {
        let val = mapItem(item["ITEM"])[0];

        if (val >= 40) {
            somaItem += val;
        } else {
            logsMenos40++;
            somaItem += 0;
        }
    })
    console.log(`|| DEPÓSITOS DE MENOS DE 40x ${ITEM_SEARCHED} NÂO FORAM CONTADOS! Total de depósitos com menos de 40x ${ITEM_SEARCHED}: ${logsMenos40}`);
    console.log(`|| ${person} Depositou o total de ${ITEM_SEARCHED} no Baú: ${somaItem}`);
    return somaItem;
}

async function getItemQuantity(param_searched) {
    let soma = 0;
    let request = await requestALL({security: false, limit: 100});
    let filter = request.filter( item => mapItem(item["ITEM"])[1] == param_searched);
    filter.forEach(item => {
        if(item["ACTION"] === "GUARDOU") {
            soma += mapItem(item["ITEM"])[0]
        }
        if(item["ACTION"] === "RETIROU") {
            soma -= mapItem(item["ITEM"])[0]
        }
    })
    return soma;
}
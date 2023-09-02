import { _LOG_ } from "../index.js";
import { GET_ALL_LOG } from "./fetch.js";
import { mapItem } from "./mapper.js";
var ITEM_SEARCHED = "Folha de Coca"; // fazer choice


// function formatDateTime(dateTime) {
//     const dateParts = dateTime.split("/");
//     const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
//     return formattedDate;
// }

// export function sortDateTime(all_log) {
//         let dates = [];
//         dates.push(...all_log.map(item => {
//             let formattedDate = formatDateTime(item.DATA);
//             return {date: new Date(formattedDate), partner: item.PASSAPORTE};
//         })); // Coletando as datas

//         // Ordenando as datas
//         dates.map(dateOBJ => dateOBJ.date).sort((a, b) => a - b);
//         console.log(dates);

//         // Construindo o array de registros de log ordenados por data
//         const sortedLogs = dates.map(dateOBJ => {

//             const log = all_log.find(item => {
//                 const logDate = new Date(formatDateTime(item.DATA)).getTime();
//                 const logPartner = item.PASSAPORTE;
                
//                 return logDate === dateOBJ.date.getTime() && logPartner === dateOBJ.partner;
//             });
//             return log;
//         });
        
//         return sortedLogs;
// }

export async function getPersonLog(idName, all) {
    if(all.length <= 0) {
        console.log("entrou")
        all = await GET_ALL_LOG({ security: false, limit: 100 });
        _LOG_.value = all;
    }
    console.log(all);
    if(idName == "all") {
        return all;
    }
    let personalLOG = all.filter(log => log["PASSAPORTE"] == idName) // seletor de pessoa
    return personalLOG;
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
import { config, personIdName, seeAll } from "./config.js";
var { TOKEN, ID_CHAT_BAU, LAST_ID_MESSAGE, ITEM_SEARCHED } = config;

let personLOG = [];

function setLastId(last) {
    LAST_ID_MESSAGE = last;
    seeAll ? console.log("Ultimo ID de Mensagem requisitado: " + LAST_ID_MESSAGE) : "";
}

function getLastId() {
    return LAST_ID_MESSAGE;
}

const headers = {
    "Authorization": `${TOKEN}`
};

function mapRawObjects(data) {
    const regex = /\[([^:\]]+)\]:\s(.*?)(?=\n\[|$|\[([^:\]]+)\]:)/g;
    const findActionRegex = /\[(GUARDOU|RETIROU)\]\s*[\r\n]*/g;

    let input = data.map(item => {
        return item.content;
    })

    return input.map(input => {
        let match;
        let secondmatch;
        let object = {};
        while ((match = findActionRegex.exec(input)) !== null) {
            object["ACTION"] = match[1];
        }
        while ((secondmatch = regex.exec(input)) !== null) {
            const key = secondmatch[1];
            const value = secondmatch[2];
            object[key] = value;
        }

        return object;
    });
}

async function fetchLOG(logChannel) {
    let res = await fetch(logChannel, {
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) return [];
            console.log("Running...");
            setLastId(data[0].id);
            return mapRawObjects(data)
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });

    return res;
}

async function requestALL({ security, limit } = { security: true, limit: 50 }) {
    let flag = true;
    let count = 0;
    var retorno = [];
    while (flag) {
        if (security) {
            if (count == 10) flag = false;
        }
        count++;

        let url = `https://discord.com/api/v9/channels/${ID_CHAT_BAU}/messages?after=${getLastId()}&limit=${limit}`;
        let valor = await fetchLOG(url);
        if (valor.length === 0) {
            seeAll ? console.log("Requisições Finalizadas!") : "";
            flag = false;
            break;
        }
        retorno.push(...valor);
    }
    return retorno;
}

async function getPersonLog(idName) {
    let all = await requestALL({ security: false, limit: 100});
    personLOG.push(...all.filter(log => log["PASSAPORTE"] == idName)) // seletor de pessoa
    seeAll ? console.log("Todos Logs de: "+idName) : "";
    seeAll ? console.table(personLOG) : "";
    return personLOG;
} 

async function getSomaSemente() {
    let somaSemente = 0;
    let logsMenos40 = 0;
    let request = await getPersonLog(personIdName);

    let retiradaSemente = request.filter(item => item["ACTION"] === "GUARDOU" && itemFilter(item["ITEM"])[1] === ITEM_SEARCHED);
    console.log(`GUARDANDO ${ITEM_SEARCHED.toUpperCase()}:`)
    console.table(retiradaSemente)
    if(retiradaSemente.length === 0) console.log(`!!!!!!!!!!!!! ${personIdName} NÃO GUARDOU nenhuma ${ITEM_SEARCHED} no baú até aonde foi lido.`)
    retiradaSemente.forEach(item => {
        let val = itemFilter(item["ITEM"])[0];

        if (val >= 40) {
            somaSemente += val;
        } else {
            logsMenos40++;
            somaSemente += 0;
        }
    })
    console.log(`|| DEPÓSITOS DE MENOS DE 40x ${ITEM_SEARCHED} NÂO FORAM CONTADOS! Total de depósitos com menos de 40x ${ITEM_SEARCHED}: ${logsMenos40}`);
    console.log(`|| ${personIdName} Depositou o total de ${ITEM_SEARCHED} no Baú: ${somaSemente}`);
    return somaSemente;
}

async function getItemQuantity() {
    let soma = 0;
    let request = await requestALL({security: false, limit: 100});
    let filter = request.filter( item => itemFilter(item["ITEM"])[1] == ITEM_SEARCHED);
    filter.forEach(item => {
        if(item["ACTION"] === "GUARDOU") {
            soma += itemFilter(item["ITEM"])[0]
        }
        if(item["ACTION"] === "RETIROU") {
            soma -= itemFilter(item["ITEM"])[0]
        }
    })
    return soma;
}

function itemFilter(inputString) {
    const regex = /^([\d.]+)x (.+)$/; // Expressão regular para capturar o número e o texto após o "x"

    const match = inputString.match(regex);

    var numericValue;
    var textValue;

    if (match) {
        numericValue = match[1].replace(/\./g, ''); // Captura o valor numérico
        textValue = match[2]; // Captura o texto
    } else {
        console.log('A string não corresponde ao padrão esperado.');
    }
    return [parseInt(numericValue), textValue];
}

async function log() {
    let quant = await getItemQuantity();
    console.log(`Quantidade de ${ITEM_SEARCHED} no baú: ${quant}`);
}

getSomaSemente();
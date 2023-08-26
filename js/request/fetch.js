import { mapRawObjects } from "./mapper.js";

var { TOKEN, ID_CHAT_BAU, LAST_ID_MESSAGE } = localStorage.get("config");

export const SETTED_LAST_ID_MESSAGE = LAST_ID_MESSAGE;

export function setLastId(last) {
    LAST_ID_MESSAGE = last
    console.log("Ultimo ID de Mensagem requisitado: " + last);
}

function getLastId() {
    return LAST_ID_MESSAGE;
}

var headers = {
    "Authorization": `${TOKEN}`
};

async function GET_LOG(logChannel) {
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

export async function GET_ALL_LOG({ security, limit } = { security: true, limit: 50 }) {
    let flag = true;
    let count = 0;
    var retorno = [];
    while (flag) {
        if (security) {
            if (count == 10) flag = false;
        }
        count++;

        let url = `https://discord.com/api/v9/channels/${ID_CHAT_BAU}/messages?after=${getLastId()}&limit=${limit}`;
        let valor = await GET_LOG(url);
        if (valor.length === 0) {
            flag = false;
            console.log("Requisições finalizadas!");    
        }
        retorno.push(...valor);
    }
    return retorno;
}
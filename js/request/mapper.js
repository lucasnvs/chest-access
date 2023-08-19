export function mapRawObjects(data) {
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
            const key = secondmatch[1].toUpperCase();
            const value = secondmatch[2];
            object[key] = value;
        }

        return object;
    });
}

export function mapItem(inputString) {
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
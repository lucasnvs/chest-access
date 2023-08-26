export class Dinamyc {

    #_setted_value;
    #_value;
    
    constructor(value){
        this.#_setted_value = value;
        this.#_value = value;
    }

    get value() {
        return this.#_value;
    }

    set value(newValue) {
        this.#_value = newValue;
    }

    get setted() {
        return this.#_setted_value;
    }
}
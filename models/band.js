//Permite crear un id unico se usa con el paquete uuid que se instala => npm i uuid
const { v4: uuidV4 } = require('uuid');

class Band {
    constructor(name = 'no-name') {
        this.id = uuidV4(); //Identificador unico
        this.name = name;
        this.votes = 0;
    }
}

//Exporto la clase para que sea accesible desde todos los lugares
module.exports = Band;
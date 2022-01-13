const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log('init server');

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Aerosmith'));


console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    //Escuchar y emitir
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });

    client.on('emitir-mensaje', (payload) => {
        console.log('nuevo-mensaje', payload);
        //io.emit('nuevo-mensaje', payload); //Se lo emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); //Se lo emite a todos menos al que lo emitió
    });


    //Creo la nueva banda
    client.on('vote-band', (payload) => {
        console.log('Recibir voto', payload);
        bands.voteBand(payload.id);
        //Refresco la lista de bandas
        io.emit('active-bands', bands.getBands());
    });


    client.on('add-band', (payload) => {
        console.log('Agregar Nueva Banda', payload);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        //Refresco la lista de bandas
        io.emit('active-bands', bands.getBands());
    });

    //elimino  la banda
    client.on('delete-band', (payload) => {
        console.log('Eliminar', payload);
        bands.deleteBand(payload.id);
        //Refresco la lista de bandas
        io.emit('active-bands', bands.getBands());
    });




});
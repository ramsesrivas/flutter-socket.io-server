const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado')

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    //Escuchar y emitir
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });
});
const { io } = require('../server');
const { Users } = require('../classes/users');
const {createMessage } = require('../utils/utils')

const users = new Users();

io.on('connection', (client) => {

    client.on('inChat', (user, callback) => {
        
        if(!user.name || !user.room) {
            return callback({
                error: true,
                message: 'Name/Room fields are required'
            });
        }

        client.join(user.room);

        users.addPerson(client.id, user.name, user.room);

        client.broadcast.to(user.room).emit('peopleList', users.getPeopleByRoom(user.room));
        client.broadcast.to(user.room).emit('createMessage', createMessage('Admin',`${user.name} is here`));

        callback(users.getPeopleByRoom(user.room));
    });

    client.on('createMessage', (data, callback) => {
        const person = users.getPerson(client.id);

        const msg = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', msg);

        callback(msg);
    });

    client.on('disconnect', () => {
        const removedPerson = users.removePerson(client.id);

        client.broadcast.to(removedPerson.room).emit('createMessage', createMessage('Admin',`${removedPerson.name} is gone`));
        client.broadcast.to(removedPerson.room).emit('peopleList', users.getPeopleByRoom(removedPerson.room));
    });

    // Private Messages
    client.on('privateMessage', data => {
        const person = users.getPerson(client.id);

        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    });

});
class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        let person = { id, name, room };

        this.people.push(person);

        return this.people;
    }

    getPerson(id) {
        let person = this.people.find(per => per.id === id);
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeopleByRoom(idRoom) {
        let peopleOnRoom = this.people.filter(person => person.room === idRoom);
        return peopleOnRoom;
    }

    removePerson(id) {
        const removedPerson = this.getPerson(id);
        this.people = this.people.filter(person => person.id !== id);

        return removedPerson;
    }


}

module.exports = {
    Users
}
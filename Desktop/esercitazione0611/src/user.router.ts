import express from 'express';
import postsRouter, {Post}from './posts.router';

const usersRouter = express.Router();
usersRouter.use(express.json());

function validateUser(newUser: User, condition: string) {
    if (condition === 'create') {
        return newUser.firstName && newUser.lastName && newUser.email && newUser.age !== undefined;
    } else if (condition === 'update') {
        return newUser.firstName || newUser.lastName || newUser.email || newUser.age !== undefined;
    } else {
        console.log('Invalid condition');
        return false;
    }
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    post: Post[];
}
//  tutti gli utenti
const users: User[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 30,
        post:[]
    },
    {
        id: 2,
        firstName: 'luca',
        lastName: 'dodric',
        email: 'luca.dodric@dodricluca.com',
        age: 30,
        post:[]
    },
    
];
let lastUserId: number = users.length;
//readAll
usersRouter.get('/', (req, res) => {
    res.status(200).json(users);
});
// create

usersRouter.post('/', (req, res) => {
    const newUser = req.body;

    if (!newUser) {
        return res.status(400).json({ error: 'Dati utente mancanti' });
    }
    lastUserId++;
    newUser.id = lastUserId;
    users.push(newUser);
    res.status(201).send(users);
});
//readAll
usersRouter.get('/', (req, res) => {
    res.status(200).json(users);
});
// readById
usersRouter.get('/:id', (req, res) => {
    7
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.status(200).send(users);

});
// updatebyID
usersRouter.put('/:id', (req, res) => {

    const id = Number(req.params.id);
    const updatedData: User = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).send({ error: 'Utente non trovato' });
    }
    if (!validateUser(updatedData, "update")) {
        return res.status(400).send({
            error: 'Dati utente incompleti o non validi'
        });
    }
    users[userIndex].firstName = updatedData.firstName;
    users[userIndex].lastName = updatedData.lastName;
    users[userIndex].email = updatedData.email;
    users[userIndex].age = updatedData.age;
    res.status(200).send(users[userIndex]);
});
//delete
usersRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).send({ error: 'Utente non trovato' });
    }

    users.splice(userIndex, 1);

    res.status(204).send(users);
});

export default usersRouter;



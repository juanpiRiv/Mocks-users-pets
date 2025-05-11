const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../dao/models/user.model');
const Pet = require('../dao/models/pet.model');

// Mock básico de mascotas (opcional)
router.get('/mockingpets', (req, res) => {
    const pets = Array.from({ length: 10 }, () => ({
        name: faker.person.firstName(),
        type: faker.animal.type()
    }));
    res.json({ status: 'success', payload: pets });
});

// Mock de 50 usuarios estilo Mongo
router.get('/mockingusers', (req, res) => {
    const users = Array.from({ length: 50 }, () => ({
        _id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 60 }),
        password: bcrypt.hashSync('coder123', 10),
        role: Math.random() > 0.5 ? 'user' : 'admin',
        pets: []
    }));
    res.json({ status: 'success', payload: users });
});

// Generación e inserción real en MongoDB
router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    try {
        const userDocs = [];

        // Crear usuarios
        for (let i = 0; i < users; i++) {
            const newUser = await User.create({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 18, max: 60 }),
                password: bcrypt.hashSync('coder123', 10),
                role: Math.random() > 0.5 ? 'user' : 'admin',
                pets: []
            });

            userDocs.push(newUser);
        }

        const userIds = userDocs.map(u => u._id);

        // Crear mascotas y asignar a usuarios
        for (let i = 0; i < pets; i++) {
            const ownerId = faker.helpers.arrayElement(userIds);
            const pet = await Pet.create({
                name: faker.person.firstName(),
                type: faker.animal.type(),
                owner: ownerId
            });

            // (Opcional) Guardar referencia en el usuario
            await User.findByIdAndUpdate(ownerId, { $push: { pets: pet._id } });
        }

        res.json({
            status: 'success',
            message: `Se generaron ${users} usuarios y ${pets} mascotas`,
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;

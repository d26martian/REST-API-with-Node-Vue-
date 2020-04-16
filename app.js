const express = require('express');
const { v4 } = require('uuid');
const path = require('path');

const app = express();

let CONTACTS = [
    { id: v4(), name: 'Martian', value: '+7-920-321-32-12', marked: false }
];

app.use(express.json());

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1000)
});

// POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false};
    CONTACTS.push(contact);
    res.status(201).json(contact);
});

// PUT
app.put('/api/contacts/:id', (req,res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id);
    CONTACTS[idx] = req.body;
    res.json(CONTACTS[idx]);
});

// DELETE
app.delete('/api/contacts/:id', (req,res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json({
        message: 'Контакт удален успешно!'
    })
});

app.use(express.static(path.resolve(__dirname + '/client')));

app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname + '/client/index.html'))
});

app.listen(4000, () => console.log('Server has been starting on port 4000...'));
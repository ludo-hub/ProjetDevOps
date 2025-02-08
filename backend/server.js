const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mludoV973%',
    database: process.env.DB_NAME || 'europe'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Route pour récupérer tous les pays
app.get('/api/countries', (req, res) => {
    db.query('SELECT * FROM countries', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des pays:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            res.json(results);
        }
    });
});

// Route pour ajouter un pays
app.post('/api/countries', (req, res) => {
    const { name, capital, population, currency } = req.body;
    db.query('INSERT INTO countries (name, capital, population, currency) VALUES (?, ?, ?, ?)', 
             [name, capital, population, currency], 
             (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du pays:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            res.status(201).json({ message: 'Pays ajouté avec succès' });
        }
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

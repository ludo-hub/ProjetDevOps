const request = require('supertest');
const app = require('../app'); // ton fichier app.js
const mysql = require('mysql2');

// Mock de la connexion MySQL
jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn(),
        query: jest.fn()
    })
}));

describe('Test des routes API', () => {
    let db;

    beforeAll(() => {
        db = mysql.createConnection(); // Simule la connexion DB
    });

    // Test pour la route GET /api/countries
    test('GET /api/countries - Devrait récupérer tous les pays', async () => {
        // Mock de la réponse de la base de données
        db.query.mockImplementationOnce((sql, callback) => {
            callback(null, [{ id: 1, name: 'France', capital: 'Paris', population: 67000000, currency: 'Euro' }]);
        });

        const response = await request(app).get('/api/countries');
        
        expect(response.status).toBe(200); // Vérifie le statut de la réponse
        expect(response.body).toEqual([{ id: 1, name: 'France', capital: 'Paris', population: 67000000, currency: 'Euro' }]); // Vérifie le corps de la réponse
    });

    // Test pour la route POST /api/countries
    test('POST /api/countries - Devrait ajouter un pays', async () => {
        // Mock de la réponse de la base de données pour l'insertion
        db.query.mockImplementationOnce((sql, values, callback) => {
            callback(null, { insertId: 1 });
        });

        const newCountry = {
            name: 'Spain',
            capital: 'Madrid',
            population: 47000000,
            currency: 'Euro'
        };

        const response = await request(app)
            .post('/api/countries')
            .send(newCountry);

        expect(response.status).toBe(201); // Vérifie que la réponse a un statut 201
        expect(response.body.message).toBe('Pays ajouté avec succès'); // Vérifie le message de la réponse
    });

    // Test pour la gestion des erreurs dans le POST
    test('POST /api/countries - Devrait renvoyer une erreur serveur', async () => {
        // Simuler une erreur dans la base de données
        db.query.mockImplementationOnce((sql, values, callback) => {
            callback(new Error('Erreur serveur'), null);
        });

        const newCountry = {
            name: 'Italy',
            capital: 'Rome',
            population: 60000000,
            currency: 'Euro'
        };

        const response = await request(app)
            .post('/api/countries')
            .send(newCountry);

        expect(response.status).toBe(500); // Vérifie le statut 500 pour une erreur serveur
        expect(response.body.error).toBe('Erreur serveur'); // Vérifie le message d'erreur
    });
});

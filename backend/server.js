const app = require('./app');

app.get('/', (req, res) => {
    res.send('Backend is running!');
  });
    
// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
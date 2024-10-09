const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    // Usa la variabile d'ambiente per l'URI MongoDB
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Questi parametri possono essere rimossi se superflui
      useUnifiedTopology: true,
    });

    console.log('Connesso al database MongoDB Atlas');
  } catch (error) {
    console.error('Errore di connessione al database:', error.message);
    process.exit(1);
  }
};

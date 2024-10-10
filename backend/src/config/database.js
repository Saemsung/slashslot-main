const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connesso al database MongoDB Atlas');
  } catch (error) {
    console.error('Errore di connessione al database:', error.message);
    process.exit(1);
  }
};

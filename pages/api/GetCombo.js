import mongoose from 'mongoose';

// Определите модель для схемы combo
const comboSchema = new mongoose.Schema({
  combo: [String],
  date: String
});

const Combo = mongoose.models.Combo || mongoose.model('Combo', comboSchema);

// Подключение к базе данных
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

// Обработчик API
export default async function handler(req, res) {
  try {
    // Подключение к базе данных
    await connectToDatabase();

    // Извлечение данных из коллекции combo
    const comboData = await Combo.findOne().sort({ date: -1 }); // Получаем последнюю запись

    if (!comboData) {
      return res.status(404).json({ message: 'No data found' });
    }

    // Отправка данных в виде JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(comboData);

  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

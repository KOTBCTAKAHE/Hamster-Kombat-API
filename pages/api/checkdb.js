import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Выполняем запрос к базе данных, чтобы получить все данные из таблицы combo
    const { rows } = await sql`SELECT combo, TO_CHAR(date, 'DD-MM-YY') as formatted_date FROM combo`;

    // Проверяем, есть ли данные в таблице
    if (!rows.length) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Отправляем данные в формате JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(rows);
  } catch (error) {
    // В случае ошибки отправляем сообщение об ошибке
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
}

import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    try {
        // Выполняем запрос к базе данных для получения последней записи
        const { rows } = await sql`SELECT combo, TO_CHAR(date, 'DD-MM-YY') as formatted_date FROM combo ORDER BY date DESC LIMIT 1`;

        // Проверяем, нашлись ли данные в базе данных
        if (rows.length === 0) {
            return res.status(500).send("No data found in the database.");
        }

        // Формируем ответ в нужном формате
        const data = {
            combo: rows[0].combo,
            date: rows[0].formatted_date
        };

        // Отправляем данные в формате JSON
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error: ' + error.message);
    }
}

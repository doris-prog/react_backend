const pool = require('../database');

async function getUserByEmail(email) {
    if (!email || typeof email !== 'string') {
        throw new Error('Invaild email');
    }
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

async function createUser({ name, email, password, salutation, country, marketing_preferences }) {
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Invalid user data');
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [userResult] = await connection.query(
            `INSERT INTO users (name, email, password, salutation, country) VALUES (?, ?, ?, ?, ?)`,
            [name, email, password, salutation, country]
        );

        const userId = userResult.insertId;

        if (Array.isArray(marketing_preferences)) {
            for (const preference of marketing_preferences) {
                const [preferenceResult] = await connection.query(
                    `SELECT id FROM marketing_preferences WHERE preference = ?`,
                    [preference]
                );

                if (preferenceResult.length === 0) {
                    throw new Error(`Invalid marketing preference: ${preference}`);
                }

                const preferenceId = preferenceResult[0].id;

                await connection.query(
                    `INSERT INTO user_marketing_preference (user_id, preference_id) VALUES (?, ?)`,
                    [userId, preferenceId]
                );
            }
        }

        await connection.commit();
        return userId;
    } catch (error) {
        console.error("createUser: ", error);
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function updateUser(id, { name, email, password, salutation, country, marketing_preferences }) {
    if (!id || !email || !password || typeof id !== 'number' || typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Invalid user data');
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            `UPDATE users SET name = ?, password = ?, salutation = ?, country = ? WHERE id = ?`,
            [name, email, password, salutation, country, id]
        );

        await connection.query(`DELETE FROM user_marketing_preferences WHERE user_id = ?`, [id]);
        if (Array.isArray(marketing_preferences)) {
            for (const preference of marketing_preferences) {
                await connection.query(
                    `INSERT INTO user_marketing_preferences (user_id, preference) VALUES (?, ?)`,
                    [id, preference]
                );
            }
        }
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUser
};
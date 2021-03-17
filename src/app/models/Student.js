const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
    all(callback) {
        db.query(`
            SELECT *
            FROM students
            ORDER BY name ASC`,
            function (err, results) {
                if (err) { throw `Database error! ${err}`; }

                callback(results.rows);
            }
        );
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                email,
                birth,
                grade,
                weekly_workload,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.weekly_workload,
            data.teacher
        ];

        db.query(query, values, function (err, results) {
            if (err) { throw `Database error! ${err}`; }

            callback(results.rows[0]);
        });
    },
    find(id, callback) {
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers
            ON teachers.id = students.teacher_id
            WHERE students.id = $1`,
            [id], function (err, results) {
                if (err) { throw `Database error! ${err}`; }

                callback(results.rows[0]);
            }
        );
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
                avatar_url = ($1),
                name = ($2),
                email = ($3),
                birth = ($4),
                grade = ($5),
                weekly_workload = ($6),
                teacher_id = ($7)
            WHERE id = $8
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.weekly_workload,
            data.teacher,
            data.id
        ];

        db.query(query, values, function (err, results) {
            if (err) { throw `Database error! ${err}`; }

            callback();
        });
    },
    delete(id, callback) {
        db.query(`
            DELETE FROM students
            WHERE id = $1`,
            [id], function (err, results) {
                if (err) { throw `Database error! ${err}`; }

                callback();
            }
        );
    },
    teacherSelectOptions(callback) {
        db.query(`
            SELECT id, name
            FROM teachers
            ORDER BY name ASC`,
            function (err, results) {
                if (err) { throw `Database error! ${err}`; }

                callback(results.rows);
            }
        );
    }
}
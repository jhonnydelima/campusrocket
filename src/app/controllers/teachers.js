const Teacher = require("../models/Teacher");
const { age, graduation, classType, date } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Teacher.all(function (teachers) {
            for (teacher of teachers) {
                teacher.subjects_taught = teacher.subjects_taught.split(",");
            }

            return res.render("teachers/index", { teachers });
        });
    },
    create(req, res) {
        return res.render("teachers/create");
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        Teacher.create(req.body, function (teacher) {
            return res.redirect(`/teachers/${teacher.id}`);
        });
    },
    show(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) {
                return res.send("Teacher not found!");
            }

            teacher.age = age(teacher.birth_date);
            teacher.graduation = graduation(teacher.education_level);
            teacher.classType = classType(teacher.class_type);
            teacher.subjects_taught = teacher.subjects_taught.split(",");
            teacher.created_at = date(teacher.created_at).format;

            return res.render("teachers/show", { teacher });
        });
    },
    edit(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) {
                res.send("Teacher not found!")
            }

            teacher.birth_date = date(teacher.birth_date).iso;

            return res.render("teachers/edit", { teacher });
        });
    },
    update(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        Teacher.update(req.body, function () {
            return res.redirect(`/teachers/${ req.body.id }`);
        });
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function() {
            return res.redirect(`/teachers`);
        });
    },
}
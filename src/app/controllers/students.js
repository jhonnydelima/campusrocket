const Student = require("../models/Student");
const { date, grade } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Student.all(function (students) {
            return res.render("students/index", { students });
        });
    },
    create(req, res) {
        Student.teacherSelectOptions(function(teacherOptions) {
            return res.render("students/create", { teacherOptions });
        });
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        Student.create(req.body, function (student) {
            return res.redirect(`/students/${student.id}`);
        });
    },
    show(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) {
                return res.send("Student not found!");
            }

            student.birthday = date(student.birth).birthday;
            student.grade = grade(student.grade);

            return res.render("students/show", { student });
        });
    },
    edit(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) {
                res.send("Student not found!")
            }

            student.birth = date(student.birth).iso;

            Student.teacherSelectOptions(function (teacherOptions) {
                return res.render("students/edit", { student, teacherOptions });
            });
        });
    },
    update(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        Student.update(req.body, function () {
            return res.redirect(`/students/${ req.body.id }`);
        });
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`);
        });
    },
}
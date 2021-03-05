const fs = require('fs');
const data = require('../data.json');
const { date, grade } = require('../utils');

exports.index = (req, res) => {
    let students = [];

    for (student of data.students) {
        const newStudent = {
            ...student,
            grade: grade(student.grade)
        };

        students.push(newStudent);
    }

    return res.render("students/index", { students });
}

exports.create = (req, res) => {
    return res.render("students/create");
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    }

    const lastStudent = data.students[data.students.length - 1];
    const id = lastStudent ? lastStudent.id + 1 : 1;

    const birth = Date.parse(req.body.birth);
    
    data.students.push({
        id,
        ...req.body,
        birth
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!");

        return res.redirect("/students");
    });
}

exports.show = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find(student => {
        return student.id == id;
    });

    if (!foundStudent) {
        return res.send("Student not found!");
    }

    const student = {
        ...foundStudent,
        birthday: date(foundStudent.birth).birthday,
        grade: grade(foundStudent.grade),
    };

    return res.render('students/show', { student });
}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find(student => {
        return student.id == id;
    });

    if (!foundStudent) {
        return res.send("Student not found!");
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
    };

    return res.render('students/edit', { student });
}

exports.update = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundStudent = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundStudent) {
        return res.send("Student not found!");
    }

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number.parseInt(req.body.id),
        birth: Date.parse(req.body.birth)
    };

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect(`/students/${id}`);
    });
}

exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredStudents = data.students.filter(student => {
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect('/students');
    })
}
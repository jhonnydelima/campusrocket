const fs = require('fs');
const data = require('../data.json');
const { age, graduation, classType, date } = require('../utils');

exports.index = (req, res) => {
    let teachers = [];

    for (let teacher of data.teachers) {
        const newTeacher = {
            ...teacher,
            occupation_area: teacher.occupation_area.split(",")
        };

        teachers.push(newTeacher);
    }

    return res.render("teachers/index", { teachers });
}

exports.create = (req, res) => {
    return res.render("teachers/create");
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    }

    // let { avatar_url, name, birth, educational_level, class_type, occupation_area } = req.body

    const lastTeacher = data.teachers[data.teachers.length - 1];
    const id = lastTeacher ? lastTeacher.id + 1 : 1;

    const birth = Date.parse(req.body.birth);
    const created_at = Date.now();

    data.teachers.push({
        id,
        ...req.body,
        birth,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!");

        return res.redirect("/teachers");
    });
}

exports.show = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id;
    });

    if (!foundTeacher) {
        return res.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.educational_level),
        class_type: classType(foundTeacher.class_type),
        occupation_area: foundTeacher.occupation_area.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    };

    return res.render('teachers/show', { teacher });
}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id;
    });

    if (!foundTeacher) {
        return res.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,
    };

    return res.render('teachers/edit', { teacher });
}

exports.update = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundTeacher) {
        return res.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number.parseInt(req.body.id),
        birth: Date.parse(req.body.birth)
    };

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect(`/teachers/${id}`);
    });
}

exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(teacher => {
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect('/teachers');
    })
}
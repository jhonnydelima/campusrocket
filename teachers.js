const fs = require('fs');
const data = require('./data.json');
const { age, graduation, classType, date } = require('./utils');

// create
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all the fields!")
        }
    }

    let { avatar_url, name, birth, educational_level, class_type, occupation_area } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        educational_level,
        class_type,
        occupation_area,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })
}

// show
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

// edit
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
        birth: date(foundTeacher.birth),
    }

    return res.render('teachers/edit', { teacher });
}
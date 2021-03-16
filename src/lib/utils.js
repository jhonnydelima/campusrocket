module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 ||
            (month == 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }

        return age;
    },
    graduation(string) {
        let grad = new String(string);

        switch (string) {
            case "medio":
                grad = "Ensino Médio Completo";
                break;
            case "superior":
                grad = "Ensino Superior Completo";
                break;
            default:
                grad = grad.charAt(0).toUpperCase() + grad.slice(1);
        }

        return grad;
    },
    classType(string) {
        let class_type = new String(string);

        if (class_type == "presencial") {
            class_type = "Presencial";
        } else {
            class_type = "À distância";
        }

        return class_type;
    },
    date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        };
    },
    grade(string) {
        const grade = string.charAt(0);
        let formattedGrade = new String();

        if (grade >= 5 && grade <= 9) {
            formattedGrade = `${grade}˚ Ano do Ensino Fundamental`
        } else {
            formattedGrade = `${grade}˚ Ano do Ensino Médio`
        }

        return formattedGrade;
    }
}
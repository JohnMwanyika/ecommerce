const {
    sendMail
} = require('../utils/send_mail');

const {
    Mail
} = require('../models');

module.exports = {
    createMail: async (req, res) => {

        const {
            name,
            email,
            password
        } = req.body;

        const data = {
            name,
            email,
            password
        };

        const NewMail = await Mail.create(data)

            .then((newMail) => {
                console.log(`${newMail} created`);
                res.json({
                    status: 'success',
                    data: newMail
                })
            })
            .catch((err) => {
                res.json({
                    status: 'error',
                    data: err.message
                });
            })
    },
    getMailById: async (req, res) => {
        const {
            id
        } = req.params;
        const mail = await Mail.findByPk(id)
            .then((mail) => {
                console.log(mail);
                res.json({
                    status: 'success',
                    data: mail
                });
            })
            .catch((err) => {
                res.json({
                    status: 'error',
                    data: err.message
                });
            })
    },
    getAllMail: async (req, res) => {
        const mails = await Mail.findAll()
            .then((mails) => {
                console.log(mails);
                res.json({
                    status: 'success',
                    data: mails
                });
            })
            .catch((err) => {
                res.json({
                    status: 'error',
                    data: err.message
                });
            })
    },
    getMailByName: async (req, res) => {
        const {
            firstName,
            lastName
        } = req.body;

        function JoinName(fname, lname) {
            let fullName = `${fname} ${lname}`;
            return fullName
        };

        let fullName = JoinName(firstName, lastName);

        const mail = await Mail.findAll({
                where: {
                    name: fullName,
                }
            })
            .then((mail) => {
                console.log(mail);
                if (mail.length > 0) {
                    // res.json({
                    //     status: 'success',
                    //     data: mail
                    // });
                    res.render('serp', {
                        status: 'success',
                        data: mail
                    });
                    return;
                }
                res.render('serp', {
                    status: 'error',
                    data: "Check your spellings otherwise there is absolutely no email with that name, "
                });
            })
            .catch((err) => {
                res.json({
                    status: 'error',
                    data: err.message
                });
            })
    },
    resetPass: (req, res) => {
        try {
            const {
                fullName,
                email
            } = req.body;

            let mail = {
                from: 'mwanyikajohn@outlook.com',
                to: '5476benja@gmail.com',
                subject: 'Email password reset',
                text: `Hi there! My name is ${fullName} I would like to request a password reset for my email address, ${email}`
            };

            sendMail(mail.from, mail.to, mail.subject, mail.text)
            res.json({
                status: 'success',
                data: 'success'
            })
                // .then((response) => {
                //     res.json({
                //         status: 'success',
                //         data: 'success'
                //     })
                // })
                // .catch((err) => {
                //     res.json({
                //         status: 'error',
                //         data: err.message
                //     })
                // });

        } catch (error) {
            res.json({
                status: 'error',
                data: error.message
            })
        }

    }
}
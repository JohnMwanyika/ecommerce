
const { Mail } = require('../models');

module.exports = {
    createMail: async (req, res) => {

        const { name, email, password } = req.body;

        const data = { name, email, password };

        const NewMail = await Mail.create(data)

            .then((newMail) => {
                console.log(`${newMail} created`);
                res.json({ status: 'success', data: newMail })
            })
            .catch((err) => {
                res.json({ status: 'error', data: err.message });
            })
    },
    getMailById: async (req, res) => {
        const { id } = req.params;
        const mail = await Mail.findByPk(id)
            .then((mail) => {
                console.log(mail);
                res.json({ status: 'success', data: mail });
            })
            .catch((err) => {
                res.json({ status: 'error', data: err.message });
            })
    },
    getAllMail: async (req, res) => {
        const mails = await Mail.findAll()
            .then((mails) => {
                console.log(mails);
                res.json({ status: 'success', data: mails });
            })
            .catch((err) => {
                res.json({ status: 'error', data: err.message });
            })
    },
    getMailByName: async (req, res) => {
        const { name } = req.body;
        const mails = await Mail.findAll({
            where: { name }
        })
            .then((mails) => {
                console.log(mails);
                res.json({ status: 'success', data: mails });
            })
            .catch((err) => {
                res.json({ status: 'error', data: err.message });
            })
    }
}
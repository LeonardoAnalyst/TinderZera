const Dev = require('../model/Dev');

module.exports = {
    async  store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;


        const loggeDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if (targetDev.likes.includes(loggeDev._id)) {
            console.log('Deu Match!');
        }
        loggeDev.likes.push(targetDev._id);

        await loggeDev.save();

        return res.json(loggeDev);
    }
};
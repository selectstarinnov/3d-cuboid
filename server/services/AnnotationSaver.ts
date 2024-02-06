const fs = require('fs');
const requirePath = require("../requirePath.ts")
const {dirname} = requirePath("server/utils.ts")

const annotationSaver = (req, res) => {
    const fileBody = req.body;
    const filePath = dirname + '/' + fileBody.path;
    delete fileBody['path']
    fs.writeFileSync(filePath, JSON.stringify(fileBody))
    res.send({
        ok: 'success'
    })
}

module.exports = annotationSaver
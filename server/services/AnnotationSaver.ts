const fs = require('fs');
const requirePath = require("../requirePath.ts")
const {dirname, pad} = requirePath("server/utils.ts")
const classes = requirePath("config/classes.js");


const initAnnotationFile = (index) => ({
// {"name":"000001","timestamp":0,"index":1,"labels":[]}
    name: pad(index, 6),
    timestamp: 0,
    index,
    labels: []
})

const annotationSaver = (req, res) => {
    const fileBody = req.body;
    const filePath = dirname + '/' + fileBody.path;
    if(!fs.existsSync(filePath)){
        const initData = initAnnotationFile(fileBody.index);
        fs.writeFileSync(`${initData.name}.json`, JSON.stringify(initData, null, 4), 'utf8');
    }
    delete fileBody['path']
    fs.writeFileSync(filePath, JSON.stringify(fileBody))
    res.send({
        ok: 'success'
    })
}

module.exports = annotationSaver
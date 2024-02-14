
const fs = require('fs');
const requirePath = require("../requirePath.ts")
const {dirname} = requirePath("server/utils.ts")
const classes = requirePath("config/classes.js");
const annotationSaver = requirePath("server/services/AnnotationSaver.ts")
const {configSetting} = requirePath("server/services/CommonService.ts")
const appRouter = (app) => {
    app.get("/", (req, res) => {
        res.sendFile(dirname + "/index.html");
    });

    app.get("/classes", (req, res) => {
        res.send({
            classes
        })
    });

    app.post("/save", (req, res) => {
        annotationSaver(req, res);
    });

    app.get("/configs", (req, res) => {
        const response = configSetting();
        res.json(response)
    });

    app.get("/frames", (req, res) => {
        const {dataset, sequence} = req.query;
        const path = `${dirname}/input/${dataset}/${sequence}/pointclouds`;
        let dir = fs.readdirSync(path);
        let fileCount = 0;
        dir.forEach(item => {
            fileCount++;
        })
        res.send({
            frames: fileCount
        })
    });
}

module.exports = appRouter;
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require("express");
const app = express();


app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/save", (req, res) => {
    const fileBody = req.body;
    const filePath = __dirname + '/' + fileBody.path;
    if(fs.statSync(filePath)){
        delete fileBody['path']
        fs.writeFileSync(filePath, JSON.stringify(fileBody))
    }
    res.send({
        ok: 'success'
    })
});

app.get("/frames", (req, res) => {
    const fileBody = req.body;
    const {dataset, sequence} = req.query;
    const path = `${__dirname}/input/${dataset}/${sequence}/annotations`;
    let dir = fs.readdirSync(path);
    let fileCount = 0;
    dir.forEach(item => {
        fileCount++;
    })
    res.send({
        frames: fileCount
    })
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`start! express server on port ${PORT}`)
})
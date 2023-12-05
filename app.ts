const bodyParser = require('body-parser');
const fs = require('fs');
const express = require("express");
const app = express();


app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.get("/", (req, res) => {
    console.log("/index.html")
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
const PORT = 80;
app.listen(PORT, () => {
    console.log(`start! express server on port ${PORT}`)
})
import {Express} from "express";

export const appRouter = (app: Express) => {
    app.get("/", (req, res) => {
        console.log("/index.html")
        res.sendFile(__dirname + "/index.html");
    });

    app.post("/save", (req, res) => {
        console.log(__dirname)
        res.send({
            ok: 'success'
        })
    });
}


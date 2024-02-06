const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const appRouter = require("./server/routers/appRouter.ts")
const PORT = 80;

app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

appRouter(app);

app.listen(PORT, () => {
    console.log(`start! express server on port ${PORT}`)
})
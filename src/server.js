const express = require('express');
const path = require('path');
const app = express();
const icon = require('serve-favicon');
const open = require("open");

app.use(icon(path.join(__dirname, './public/favicon.ico')));

app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(1996, ()=>{
console.log(`
You can now view run-my-cred in the browser.

Local: http://localhost:1996`);
});

open("http://localhost:1996")
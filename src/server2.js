const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const webdriver = require('selenium-webdriver');
const { creds } = require("../creds");
require('chromedriver');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const gotCreds = creds;

app.post(`/`, async (req, res) => {
    const driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get(req.body.url);
    setTimeout(() => {
        driver.findElement(webdriver.By.className("urname")).sendKeys(req.body.username);
        driver.findElement(webdriver.By.className("urpass")).sendKeys(req.body.password);
        driver.findElement(webdriver.By.className("loginButton")).click()
    }, 10000)
    return res.status(200).json({username: req.body.username});
});

app.get(`/getCreds`, async (_req, res) => {
    return res.json(gotCreds);
});

app.listen(2021, ()=>{});
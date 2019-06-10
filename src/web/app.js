const express = require("express");
const { join } = require("path");
const bodyParser = require('body-parser');
const renderObj = require("../util/RenderObject");
const vhost = require("vhost");

module.exports = client => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.text());

    app.set("view engine", "hbs");
    
    const API = express.Router();
    API.use(bodyParser.json());
    API.use(bodyParser.text());

    require("./api/v1")(client.sql, API);
    app.use(vhost("api.shodanbot.com", API));
    //app.use("/api", API);

    app.use("/", express.static(join(__dirname, "views")));

    app.get("/", async (req, res, next) => {
        client.sql.query(`SELECT commands_ran FROM analytics WHERE bot ="shodan"`, (error, rows, fields) => {
            let size = rows[0].commands_ran;
            if (error) size = "ERROR";
            renderObj.commands_run = size
        });
        client.sql.query(`SELECT * from updates ORDER BY id DESC LIMIT 6`, (error, rows, fields) => {
            renderObj.tile_one.title = rows[0].title;
            renderObj.tile_one.description = rows[0].description;
            renderObj.tile_one.version = rows[0].id
            renderObj.tile_two.title = rows[1].title;
            renderObj.tile_two.description = rows[1].description;
            renderObj.tile_two.version = rows[1].id
            renderObj.tile_three.title = rows[2].title;
            renderObj.tile_three.description = rows[2].description;
            renderObj.tile_three.version = rows[2].id
            renderObj.tile_four.title = rows[3].title;
            renderObj.tile_four.description = rows[3].description;
            renderObj.tile_four.version = rows[3].id
            renderObj.tile_five.title = rows[4].title;
            renderObj.tile_five.description = rows[4].description;
            renderObj.tile_five.version = rows[4].id
            renderObj.tile_six.title = rows[5].title;
            renderObj.tile_six.description = rows[5].description;
            renderObj.tile_six.version = rows[5].id
        });

        renderObj.users = client.users.size;
        renderObj.guilds = client.guilds.size;
        renderObj.commands_total = client.commands.array().length;

        res.render(join(__dirname, "views/index.hbs"), renderObj);
    })

    app.get("/bot/invite", (req, res, next) => {
        res.redirect("https://discordapp.com/oauth2/authorize?client_id=378909180666314754&scope=bot&permissions=8");
    })

    app.get("/bot/support", (req, res, next) => {
        res.redirect("https://discord.gg/nCbB3Tm");
    })

    

    app.listen(client.config.web["express-port"] || process.env.port || 8685);
}
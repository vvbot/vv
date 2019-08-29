const express = require("express");
const { join } = require("path");
const bodyParser = require('body-parser');
const renderObj = require("../util/RenderObject");
const vhost = require("vhost");
const helmet = require("helmet");

module.exports = client => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(helmet());

    app.set("view engine", "hbs");
    
    const API = express.Router();
    API.use(bodyParser.json());
    API.use(bodyParser.text());
    API.use(helmet());

    require("./api/v1")(client.sql, API);
    app.use(vhost("api.shodanbot.com", API));
    //app.use("/api", API);

    app.use("/", express.static(join(__dirname, "views")));

    app.get("/", async (req, res, next) => {
        const [cmd_rows, cmd_error] = await client.sql.execute("SELECT `commands_ran` FROM `analytics` WHERE `bot` = ?", ["shodan"]).catch(console.log);
        renderObj.commands_run = cmd_rows[0].commands_ran ? cmd_rows[0].commands_ran : "ERROR";
        if(cmd_error) console.log(cmd_error);

        const [updates_rows, updates_error] = await client.sql.query("SELECT * from `updates` ORDER BY `id` DESC LIMIT 6").catch(console.log);
        renderObj.tile_one.title = updates_rows[0].title;
        renderObj.tile_one.description = updates_rows[0].description;
        renderObj.tile_one.version = updates_rows[0].id
        renderObj.tile_two.title = updates_rows[1].title;
        renderObj.tile_two.description = updates_rows[1].description;
        renderObj.tile_two.version = updates_rows[1].id
        renderObj.tile_three.title = updates_rows[2].title;
        renderObj.tile_three.description = updates_rows[2].description;
        renderObj.tile_three.version = updates_rows[2].id
        renderObj.tile_four.title = updates_rows[3].title;
        renderObj.tile_four.description = updates_rows[3].description;
        renderObj.tile_four.version = updates_rows[3].id
        renderObj.tile_five.title = updates_rows[4].title;
        renderObj.tile_five.description = updates_rows[4].description;
        renderObj.tile_five.version = updates_rows[4].id
        renderObj.tile_six.title = updates_rows[5].title;
        renderObj.tile_six.description = updates_rows[5].description;
        renderObj.tile_six.version = updates_rows[5].id;

        renderObj.users = client.users.size;
        renderObj.guilds = client.guilds.size;
        renderObj.commands_total = client.commands.size;

        res.render(join(__dirname, "views/index.hbs"), renderObj);
    })

    app.get("/bot/invite", (req, res, next) => {
        res.redirect("https://discordapp.com/oauth2/authorize?client_id=378909180666314754&scope=bot&permissions=8");
    })

    app.get("/bot/support", (req, res, next) => {
        res.redirect("https://discord.gg/nCbB3Tm");
    })

    app.listen(client.config.web["webapp-port"] || process.env.port || 8685);
}
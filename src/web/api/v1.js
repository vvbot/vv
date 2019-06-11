const { stripIndent } = require("common-tags");

module.exports = (sql, API) => {
    this.version = "1";
    this.baseURL = `https://api.shodanbot.com/v${this.version}/`;

    API.get("/", (req, res) => {
        return res.send(stripIndent`
        sh0dan API v${this.version}<br>
        Base URL: ${this.baseURL}<br>
        <br>
        Endpoints will be specified like this:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;TYPE :: ENDPOINT<br>
        Example:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;POST :: /fun/clap<br>
        <br>
        URL Parameters will be shown with a colon (:). Example:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;GET :: /posts/:ID
        <br>
        URL Queries will be shown with a selector like this:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;GET :: /tools/snowflake?snowflake=SNOWFLAKE<br>
        <br>
        ---------------<br>
        <br>
        Endpoints:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Post Related:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GET :: /posts/latest  -  Returns the latest sh0dan update<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GET :: /posts/:ID  -  Returns the update with the specified ID<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GET :: /posts  -  Returns all sh0dan updates<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Fun:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POST :: /fun/clap  -  Replaces the spaces in the request body with claps 👏<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POST :: /fun/reverse  -  Reverses the request body<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Tools:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GET :: /tools/snowflake?snowflake=SNOWFLAKE  -  Converts the given snowflake to a readable date<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POST :: /tools/snowflake  -  Converts the snowflake given in the request body to a readable date<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Tags:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GET :: /tags  -  Gets all tags in the database<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GET :: /tags/:NAME  -  Gets the tag with the given name. NAME must be URI encoded!
        `)
    })
    API.get("/v1/posts/latest", (req, res) => {
        sql.query(`SELECT * FROM updates ORDER BY id DESC LIMIT 1`, (error, rows, fields) => {
            return res.json(rows[0]);
        });
    });

    API.get("/v1/posts/:id", (req, res) => {
        sql.query(`SELECT * FROM updates WHERE id = ${req.params.id}`, (error, rows, fields) => {
            if(!rows) return res.json({
                "error": "No post with that ID exists"
            })
            else return res.json(rows[0]);
        });
    });

    API.get("/v1/posts", (req, res) => {
        sql.query(`SELECT * FROM updates ORDER BY ID ${req.query.descending === "true" ? "DESC" : ""} ${req.query.limit ? "LIMIT " + req.query.limit : ""}`, (error, rows, fields) => {
            if (!rows) return res.json({
                "error": "Nothing found"
            });
            else return res.json(rows);
        });
    });

    API.post("/v1/fun/clap", (req, res) => {
        return res.json({
                "result": req.body.split(" ").join(" 👏 ")
        });
    });

    API.post("/v1/fun/reverse", (req, res) => {
        return res.json({
            "result": req.body.split("").reverse().join("")
        });
    });

    API.get("/v1/tools/snowflake", (req, res) => {
        return res.json({
            "result": new Date((req.query.snowflake * Math.pow(2, -22)) + 1420070400000).toUTCString()
        });
    });

    API.post("/v1/tools/snowflake", (req, res) => {
        return res.json({
            "result": new Date((req.body * Math.pow(2, -22)) + 1420070400000).toUTCString()
        });
    });

    API.get("/v1/tags", (req, res) => {
        sql.query(`SELECT * FROM tags`, (error, rows, fields)=> {
            if(!rows) return res.json({
                "error": "Nothing found"
            });
            else return res.json(rows);
        });
    });

    API.get("/v1/tags/:name", (req, res) => {
        console.log(decodeURIComponent(req.params.name.replace(/\+/g, "%20")).toUpperCase())
        sql.query(`SELECT * FROM tags WHERE tagName="${decodeURIComponent(req.params.name.replace(/\+/g, "%20")).toUpperCase()}"`, (error, rows, fields) => {
            if (!rows) return res.json({
                "error": "Nothing found"
            });
            else return res.json(rows[0]);
        });
    });
}
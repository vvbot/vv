const { stripIndent } = require("common-tags");

module.exports = (sql, API) => {
    this.version = "1";
    this.baseURL = `https://api.shodanbot.com/v${this.version}/`;

    API.get("/", (req, res) => {
        return res.send(stripIndent`
        sh0dan API v${this.version}
        Base URL: ${this.baseURL}

        Endpoints will be specified like this:
            TYPE :: ENDPOINT
        Example:
            POST :: /fun/clap
        
        URL Parameters will be shown with a colon (:). Example:
            GET :: /posts/:ID
        
        URL Queries will be shown with a selector like this:
            GET :: /tools/snowflake?snowflake=SNOWFLAKE
            
        ---------------

        Endpoints:
            Post Related:
                GET :: /posts/latest  -  Returns the latest sh0dan update
                GET :: /posts/:ID  -  Returns the update with the specified ID
                GET :: /posts  -  Returns all sh0dan updates
            Fun:
                POST :: /fun/clap  -  Replaces the spaces in the request body with claps 👏
                POST :: /fun/reverse  -  Reverses the request body
            Tools:
                GET :: /tools/snowflake?snowflake=SNOWFLAKE  -  Converts the given snowflake to a readable date
                POST :: /tools/snowflake  -  Converts the snowflake given in teh request body to a readable date
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
            })
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

    
}
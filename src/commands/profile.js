const { createCanvas, loadImage, registerFont } = require("canvas");
const { join } = require("path");
registerFont(join(__dirname, "..", "..", "assets", "font", "verdana.ttf"), { family: "Verdana" })

module.exports = {
    name: "profile",
    description: "Shows the profile of the given user",
    usage: "[OPTIONAL PERSON]",
    async execute(message, args, client, logger) {
        const user = client.findMember(message, args[0], true);
        client.sql.query(`SELECT * FROM users WHERE id = ${user.id}`, async (error, rows, fields) => {
            const base = await loadImage(join(__dirname, "..", "..", "assets", "image", "profile", `background-${rows[0].background}.png`));
            const overlay = await loadImage(join(__dirname, "..", "..", "assets", "image", "profile", "overlay.png"));
            const avatar = await loadImage(user.user.displayAvatarURL.replace(/\.webp|\.jpg/, ".png") + "?size=4096");

            const devBadge = await loadImage(join(__dirname, "..", "..", "assets", "image", "badges", "dev-badge.png"));
            const betaBadge = await loadImage(join(__dirname, "..", "..", "assets", "image", "badges", "beta-badge.png"));

            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");

            avatar.height = 250
            avatar.length = 250
            
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, base.width, base.height);
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, base.width / 2 - avatar.width / 2, base.height / 2 - avatar.height / 2);
            ctx.drawImage(overlay, base.width / 2 - overlay.width / 2, base.height / 2 - overlay.height / 2);
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "48px Verdana"
            ctx.fillText(rows[0].rep, 450, base.height / 2);
            ctx.fillText(rows[0].nanites, 1350, base.height / 2);

            if (rows[0].badges.includes("dev")) ctx.drawImage(devBadge, base.width / 2 - devBadge.width / 2, 18000);
            if (rows[0].badges.includes("beta")) ctx.drawImage(betaBadge, base.width / 2 - betaBadge.width / 2, 1000);
            
            message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "profile.png" }] });
        })
        
    }
}

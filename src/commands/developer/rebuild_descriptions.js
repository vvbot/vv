const { performance } = require("perf_hooks");

module.exports = {
    name: "rebuild_categories",
    description: "Rebuilds command categories.",
    adminOnly: true,
    aliases: ["rc", "rebuild_cats"],
    async execute(message, args, client) {
        const start = performance.now();

        let progress = await message.channel.send("Sweeping category names...");

        client.categories = [];

        await progress.edit("Sweeping category descriptions...")

        client.catDescs = [];

        progress.edit("Repopulating category data...");
        client.loadCategories();

        const end = performance.now();

        progress.edit(`Done. Rebuilt ${client.categories.length} categories and their respective properties in ${(end - start).toFixed(2)} ms.`);
    }
};
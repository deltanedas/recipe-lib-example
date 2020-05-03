const recipeLib = require("recipe-lib/library");

const factory = recipeLib.extend(GenericSmelter, GenericCrafter.GenericCrafterEntity, "scrap-factory", {
	load() {
		this.super$load();
		this.regions = [
			Core.atlas.find("incinerator"),
			Core.atlas.find("melter")
		];
	},
	draw(tile) {
		Draw.rect(this.regions[tile.entity.recipe], tile.drawx(), tile.drawy());
	},
	generateIcons() {
		return [Core.atlas.find("melter")];
	},

	crafted(tile, i) {
		const recipe = this.recipes[i];
		print("Scrap Factory crafted " + (recipe.output.item || recipe.output.liquid));
	}
}, [ /* Recipes */
	// Scrap to coal mode
	{
		input: {items: ["scrap/2"]},
		output: {item: "coal"},
		time: 30
	},
	// Scrap to slag mode
	{
		input: {items: ["scrap"], power: 0.5}, // Make it 2x cheaper than a melter
		output: {liquid: "slag"},
		time: 15 // ... but 1.5x slower
	},
	// REMOVE
/*	{
		input: {items: ["copper/2", "coal/3"], liquids: ["water/5", "oil/3"]},
		output: {item: "plastanium/5", liquid: "cryofluid/3"},
		time: 120
	}*/
]);
factory.category = Category.crafting;
factory.buildVisibility = BuildVisibility.sandboxOnly;
factory.localizedName = "Scrap Factory";
factory.description = "Turns scrap into Coal, or acts as a cheap melter alternative.";

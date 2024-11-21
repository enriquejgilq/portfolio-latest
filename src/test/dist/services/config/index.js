"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsService = void 0;
const cron = require("node-cron");
const Settings_schema_1 = require("../../db/schemas/Settings.schema");
class SettingsService {
    constructor() {
        this.settingsData = {};
        this.loadData();
        cron.schedule('* * * * *', () => this.loadData());
    }
    getSettingsData() {
        return this.settingsData;
    }
    async loadData() {
        try {
            this.settingsData = await Settings_schema_1.SettingsModel.findOne().lean();
            console.log('Settings data loaded!');
        }
        catch (error) {
            console.error('Error loading settings data:', error);
        }
    }
}
exports.settingsService = new SettingsService();
//# sourceMappingURL=index.js.map
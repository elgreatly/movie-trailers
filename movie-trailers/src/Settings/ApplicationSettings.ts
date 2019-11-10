export class ApplicationSettings {

    public port: number;
    public api_key: string;

    // get current application settings depending on environment variable
    static get Current(): ApplicationSettings {
        const path = '../../config.json';
        const settings = ApplicationSettings.GetSettings(path);
        return settings;
    }

    public static GetSettings(path: string) {
        const settings = new ApplicationSettings();
        try {
            // load general settings
            const currentSettings = require(path);
            settings.port = currentSettings.port;
            settings.api_key = currentSettings.api_key;

        } catch (error) {
            throw TypeError('Invalid configuration path or bad configuration file schema, Please use the sample config file.');
        }

        return settings;
    }
}

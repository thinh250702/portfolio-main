import settingsService from "../services/settings.service.js";

const loadGlobals = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettings();
    res.locals.settings = settings;
    next();
  } catch (err) {
    next(err);
  }
}

export default loadGlobals
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import configRaw from '../config/config.json' with { type: 'json' };

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get env config
const env = process.env.NODE_ENV || 'development';
const config = configRaw[env];

if (!config || !config.dialect) {
  throw new Error("Dialect needs to be explicitly supplied in config.json");
}

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// ✅ FIX: Use `pathToFileURL` for safe dynamic ESM imports on Windows
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file =>
    file.endsWith('.js') &&
    file !== path.basename(__filename) &&
    !file.includes('.test.js')
  );

for (const file of modelFiles) {
  const modulePath = pathToFileURL(path.join(__dirname, file)).href;
  const { default: modelDefiner } = await import(modulePath);
  const model = modelDefiner(sequelize, DataTypes);
  db[model.name] = model;
}

// Run associations
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
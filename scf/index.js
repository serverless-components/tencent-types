const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const tencentStore = new Redis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  family: 4,
  db: 0,
});

/**
 * 1. Get all type files from GitHub
 * 2. Parse them
 * 3. Save to redis
 */
exports.main_handler = async (event, context) => {
  const typeFiles = fs.readdirSync(path.join(__dirname, './types'));
  for (const typeFileName of typeFiles) {
    const typeYml = fs.readFileSync(path.join(__dirname, './types', typeFileName), 'utf8');
    const typeObj = yaml.load(typeYml);

    const typeHashKey = `Types:${typeFileName.split('@')[0]}`;
    const typeVersion = `version:${typeFileName.split('@')[1].slice(0, -4)}`;
    const typeValue = JSON.stringify(typeObj);
    await tencentStore.hset(typeHashKey, typeVersion, typeValue);
    console.log(typeFileName, 'done!');
  }
  const typeVersions = await tencentStore.hkeys(`Types:web-components`);

  return {
    typeVersions,
    typeFiles,
  }
}

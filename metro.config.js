const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const MetroConfig = getDefaultConfig(__dirname, {});
MetroConfig.resolver.sourceExts.push("mjs", "cjs");

module.exports = MetroConfig;

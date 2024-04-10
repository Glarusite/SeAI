const { getDefaultConfig } = require("expo/metro-config");

/** @type {import("expo/metro-config").MetroConfig} */
const MetroConfig = getDefaultConfig(__dirname, {});

module.exports = MetroConfig;

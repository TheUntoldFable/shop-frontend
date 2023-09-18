/** @type {import('next-i18next').UserConfig} */
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "bg",
    locales: ["en", "bg", "it"],
    localePath: path.resolve('./public/locales'),
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};

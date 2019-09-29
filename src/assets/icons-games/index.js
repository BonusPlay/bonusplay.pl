/**
 * The file enables `@/views/home.vue` to import all icons
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context(".", false, /\.webp$/);
const modules = [];
files.keys().forEach(key => modules.push(files(key)));

export default modules;
const rimrafPromise = require('rimraf-promise');
 
async function deleteRecursive(path) {
    await rimrafPromise(path);
}

module.exports = { deleteRecursive }
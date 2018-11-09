const screenshot = require('./screenshot.js');
const deleteFolder = require('./delete-folder.js');
const proxy = require('./proxy.js');
const mutationRules = require('./mutation-rules.js');

async function generateSet(setType, isOk, count, port) {
    await proxy.start('localhost:1337', port);
    const classification = isOk ? 'ok': 'nok';
    const endpoint = `http://localhost:${port}/`;
    console.log(endpoint);

    // cleanup old results
    await deleteFolder.deleteRecursive(`./results/${setType}/${classification}`);

    for (i=0; i < count;  i++) {
        console.log(new Date().toISOString());
        const rule = mutationRules.getRule(`./rules/${classification}.json`);
        proxy.setRule(rule);
        try {
            await screenshot.take(`./results/${setType}/${classification}`, `image_${i}.png`, endpoint);
        }
        catch (e) {
            console.log(e);
        }
        
    }   
    proxy.stop();
}

module.exports = { generateSet }
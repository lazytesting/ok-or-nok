const nunjucks = require('nunjucks');

nunjucks.configure({ autoescape: false });

function getRule(rulesFile) {
    const rules = require(rulesFile);
    const ruleTemplate = rules[ Math.floor(Math.random() * Math.floor(rules.length)) ];
    const rule = nunjucks.renderString(JSON.stringify(ruleTemplate), {});
    console.log(rule);
    return JSON.parse(rule);
}

module.exports = { getRule }

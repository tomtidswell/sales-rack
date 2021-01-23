const _ = require('lodash')

const postProcess = queryResult => {
    const hits = []
    const categories = []
    const phrases = _.chain(queryResult).filter('highlights[0]').map((q)=>{
        hits.push(_.chain(q.highlights[0].texts).filter(['type', 'hit']).map('value').value())
        categories.push(q.category)
        return {
            category: q.category,
            phrase: q.highlights[0].texts
        }
    }).value()
    console.log("Phrases", phrases)
    console.log("Hits", _.countBy(hits))
    console.log("Cats", _.countBy(categories))
    const auto = _.chain(hits).countBy(_.capitalize).toPairs().orderBy('1','desc').map(0).value()
    return { phrases, auto, categories: _.countBy(categories) }
}
module.exports = postProcess 
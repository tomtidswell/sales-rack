
function timeDiffToNow(d1Str){
    const d1 = new Date(d1Str)
    const d2 = Date.now()
    const diff = d2 - d1

    if (isNaN(diff)) return 'Not recently'
    // console.log('Raw diff', diff)
    const seconds = diff / 1000
    const hours = Math.round(seconds / 60 / 60)
    // const minutes = diff / 1000
    // const hours = diff / 1000
    // console.log('Seconds diff', seconds)
    // console.log('hours diff', hours)
    if (seconds < 300) return 'Just now'
    if (seconds < 1800) return '30 mins'
    else if (seconds < 3600) return 'In the last hour'
    else if (hours > 48) return 'A while ago'
    // this needs to be improved - actually today, rather than seconds in a day
    else return `${hours} hours ago`
}

module.exports = { timeDiffToNow }

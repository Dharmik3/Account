const reverseBalanceType = (balaceType) => {
    return balaceType === 'cr' ? 'dr' : 'cr'
}

module.exports = { reverseBalanceType }
module.exports = (json) => {
    try {
        const data = JSON.parse(json)
        return data
    }
    catch (err) {
        return false
    }
}
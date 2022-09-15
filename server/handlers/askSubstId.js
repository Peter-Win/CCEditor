const axios = require('axios').default;
const querystring = require('node:querystring')

const askSubstId = async (request, response) => {
    const {id} = request.params
    try {
        const r = await axios({
            method: 'get',
            url: "http://charchem.org/ask/ask-subst-id", 
            params: {id},
        })
        const {status, data} = r;
        if (status === 200) {
            if ('error' in data) {
                response.status(500).end(data.error)
            } else {
                response.json(data)
            }
        } else {
            response.status(500).end(`Status = ${status}`)
        }
    } catch (e) {
        response.status(500).end(e.message)
    }
}

module.exports = {askSubstId}
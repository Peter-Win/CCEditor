const axios = require('axios').default;

const askCompounds = async (request, response) => {
    const {query} = request
    const {name} = request.params
    const qMode = query && typeof query === 'object' && query.mode
    const isCas = qMode === "cas"
    const term = isCas ? `[${name}]` : name

    try {
        const compRes = await axios.get("http://charchem.org/ask/ask-compounds", {
            params: {term},
        })
        const {status, data} = compRes;
        if (status === 200) {
            if (isCas) {
                const casRes = await axios.get("http://charchem.org/ask/ask-cas", {
                    params: {n: name}
                })
                if (typeof casRes.data === 'object' && casRes.data.id) {
                    // Если найдена запись для указанного номера CAS, то надо поискать id в ранее полученном списке
                    // Если такого id нет, тогда добавить запись в начало списка
                    const sameRec = data.list.find(({id}) => id === casRes.data.id)
                    console.log("before", data)
                    if (!sameRec) {
                        data.list.unshift({
                            id: casRes.data.id,
                            name,
                            lang: "en",
                            label: name,
                        });
                        data.query = name
                    }
                }
            }
            response.json(data);
        } else {
            response.status(500).end(`Status = ${status}`);
        }
    } catch (e) {
        response.status(500).end(e.message)
    }
}

module.exports = {askCompounds}
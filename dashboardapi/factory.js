module.exports = function factory(pool) {
    async function stats(req, res) {
        var data = (await pool.query('select * from dates')).rows;
        return data
    }
    async function statsUser(req, res) {
        var arg = [];
        var data = (await pool.query('select * from stats')).rows;
        data.forEach(ele => {
            var obj = {};
            for (const key in ele) {
                if (key === "data") {
                    var turned = JSON.parse(ele[key]);
                    obj['country'] = turned.country;
                    obj['regionName'] = turned.regionName;
                    obj['regionName'] = turned.regionName;

                } else {
                    obj[key] = ele[key]
                }
            }
            arg.push(obj);
        });
        return await arg
    }
    return {
        stats,
        statsUser
    }
}
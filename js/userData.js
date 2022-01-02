const axios = require('axios');
module.exports = function userData() {
    async function getUserData() {
        try {
            var userData = await axios.get('http://ip-api.com/json');
            return userData.data
        } catch (error) {
            console.log(error);
        }

    }
    async function getUserDate() {
        var date = new Date()
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var fullDate = dd + '/' + mm + '/' + yyyy;
        return fullDate
    }
    return {
        getUserData,
        getUserDate
    }
}
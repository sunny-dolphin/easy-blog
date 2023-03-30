const axios = require("axios");
const crypto = require("crypto");

async function passwordPawned(password) {
  try {
    const hashedPassword = await crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");
    const request = hashedPassword.slice(0, 5);
    const checkUp = hashedPassword.slice(5);
    const apiUrl = `https://api.pwnedpasswords.com/range/${request}`;
    const response = await axios.get(apiUrl);
    console.log(`password ${password} -> hash: ${hashedPassword}
request: https://api.pwnedpasswords.com/range/${request}
response ${response.data}`);
    if (typeof response.data === "string" && response.data.length > 0) {
      const breachedArray = response.data.toLowerCase().split("\r\n");
      const breached = breachedArray.reduce((acc, val) => {
        if (val.includes(checkUp)) {
          return true;
        }
        return acc;
      }, false);
      return breached;
    }
    return false;
  } catch (err) {}
}

module.exports = passwordPawned;

const auth = require("../middleware/auth.js");

app.post("/welcome", auth, (msg,callback) => {
  callback(null,"Welcome 🙌 ");
});
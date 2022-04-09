const GoogleAssistant = require('./googleassistant');
const deviceCredentials = require('./devicecredentials.json');
const http = require("http")
var url = require('url');
var querystring = require('querystring');

http.createServer(async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const query = (url.parse(req.url).query).split("+").join(" ");
  await Assist(query, res);
}).listen(4000);

function Assist(question, res) {
  const CREDENTIALS = {
    client_id: deviceCredentials.client_id,
    client_secret: deviceCredentials.client_secret,
    refresh_token: deviceCredentials.refresh_token,
    type: "authorized_user"
  };
  const assistant = new GoogleAssistant(CREDENTIALS);
  assistant.assist(question)
    .then(({ text }) => {
      if (text != undefined) {
        console.log(text);
        res.write(text)
        res.end();
        return text;
      } else {
        res.write("Désolé je n'ai pas la réponse à cette question.")
        res.end();
      }
    });
}
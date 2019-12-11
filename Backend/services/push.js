var https = require('follow-redirects').https;
var options = {
  'method': 'POST',
  'hostname': 'fcm.googleapis.com',
  'path': '/fcm/send',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAelRW1Yo:APA91bGBKM_1BIhcU_uBWoxUBBgf04T8cZjmvR_wy6K7xfvRKRRjwK5kHEgG3FP7vT_g2xXstPrWq41gmfhHgkYUJAZ-LDfIlUfe--mmexeGfuJtUWvDnNKfIQ0o57HzmWXIBSP0JUo4'
  },
  'maxRedirects': 20
};

function pushNotify(request){
  
var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    // console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  `{\n    \"notification\": {\n        \"title\": \"${request.title}\",\n        \"body\": \"${request.description}\",\n        \"click_action\": \"http://localhost:3000/\",\n        \"icon\": \"http://url-to-an-icon/icon.png\"\n    },\n    \"to\": \"dhdKfynhmtZSJol1r6PsVN:APA91bHKVnJbYjQ_E9fixvkt-sfAUfDIZOGGBNLovbMlQszzgvjN24ySwxg3_tjnSKv9oC2E-Yq1dSrhhcZwVv67u5K4sTT9848d2tnzWkChkJ3tU7lDZ_LPL2cd5K49S5xodezXtxPF\"\n}`;

req.write(postData);

req.end();
}

module.exports={pushNotify};
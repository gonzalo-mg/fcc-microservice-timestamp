// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

function returnCurrentTime() {
  // function to return date in unix and utc format
  const date = new Date();
  const unix = date.getTime();
  const utc = date.toUTCString();
  return { unix, utc };
}

function returnCustomTime(inputString) {
  console.log(`**** parsing ${inputString}; ${typeof inputString} ****`);

  const date = new Date(inputString);
  console.log(`date: ${date}:  ${typeof date}`);
  console.log(`toString: ${date.toString()}:  ${typeof date.toString()}`);
  console.log(`unix: ${date.getTime()}:  ${typeof date.getTime()}`);
  console.log(`utc: ${date.toUTCString()}:  ${typeof date.toUTCString()}`);

  // valid string date
  if (date.toString() !== "Invalid Date") {
    console.log("valid string date");
    const unix = date.getTime();
    const utc = date.toUTCString();
    return { unix, utc };
  }
  // valid integer
  else if (/^\d+$/.test(inputString)) {
    const unix = parseInt(inputString);
    const utc = new Date(unix).toUTCString();
    return { unix, utc };
    // invalid input
  } else {
    return { error: "Invalid Date" };
  }
}

// 2. A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// 3. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
app.get("/api/:date", function (req, res) {
  res.json(returnCustomTime(req.params.date));
});

// 7. An empty date parameter should return the current time in a JSON object with a unix key
// 8. An empty date parameter should return the current time in a JSON object with a utc key
app.get("/api/", function (req, res) {
  const current = returnCurrentTime();
  res.json({ unix: current.unix, utc: current.utc });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

var express = require('express');
var router = express.Router();

router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend

  // Your code starts here //
  let response = [];


  var AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: 'AKIARAR74F5B2ZJFROOU',
    secretAccessKey: '58t6FYfBVhi0FhEKFwxOWExsgASY3dtg6EHAPcVP',
    region: 'ap-southeast-1'
  });
  const client = new AWS.Rekognition();
  const params = {
    Image: {
      Bytes: req.files.file.data
    },
    MaxLabels: 10
  }
  client.detectLabels(params, function (err, resp) {
    if (err) {
      console.log(err, err.stack); // if an error occurred
    } else {
      // console.log(`Detected labels for: `)
      console.log(resp.Labels);
      resp.Labels.forEach(label => {
        response.push(label.Name);
      }) // for response.labels

      res.json({
        "labels": response
      });
    } // if
  });

  // Your code ends here //
});

module.exports = router;

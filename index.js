const fs = require('fs');
const http = require('http');
const https = require('https');
const superagent = require('superagent');
// const url = require("url");
// const parsedUrl = new URL("https://dog.ceo/api/breeds/image/random");
// const req =http.get("https://dog.ceo/api/breeds/image/random", (res) => {
//   // console.log(res);
//   let data = "";
//   res.on("data", (chunk) => {
//     data += chunk;
//     // console.log(chunk);
//   });
//   res.on("end", () => {
//     console.log(data);
//   });
// });
// req.end();
// console.log(parsedUrl);
// console.log(parsedUrl.hostname);
// const breed = fs.readFileSync(`${__dirname}/dog.txt`,'utf-8');

////////////////////////////////////////////
// Callback hell
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   console.log(data);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       // console.log('test');
//       // console.log(res.body.message);
//       fs.writeFile('dog-img-url.txt', res.body.message, (err) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//       });
//     });
// });

// http req using core module
// https.get("https://dog.ceo/api/breed s/image/random", (res) => {
//     let data = "";
//     res.on("data", (chunk) => {
//       data += chunk;
//       // console.log(chunk);
//     });
//     res.on("end", () => {
//       console.log(data);
//     });
//   })
//   .on("error", (error) => {
//     console.log(error);
//   });

// Solve callback hell using promises
fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  console.log(data);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`) // at begin - pending promise , after coming with data - resolved promised
    // if resolved promise is fulfilled
    .then((res) => {
      // console.log('test');
      // console.log(res.body.message);
      fs.writeFile('dog-img-url.txt', res.body.message, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    })
    //if resolved promise is rejected
    .catch((err) => {
      if (err) {
        console.log(err.message);
        return;
      }
    });
});

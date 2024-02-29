const fs = require('fs');
const http = require('http');
// const https = require('https');
const superagent = require('superagent');
// // const url = require("url");
// // const parsedUrl = new URL("https://dog.ceo/api/breeds/image/random");
// // const req =http.get("https://dog.ceo/api/breeds/image/random", (res) => {
// //   // console.log(res);
// //   let data = "";
// //   res.on("data", (chunk) => {
// //     data += chunk;
// //     // console.log(chunk);
// //   });
// //   res.on("end", () => {
// //     console.log(data);
// //   });
// // });
// // req.end();
// // console.log(parsedUrl);
// // console.log(parsedUrl.hostname);
// // const breed = fs.readFileSync(`${__dirname}/dog.txt`,'utf-8');

// ////////////////////////////////////////////
// // Callback hell
// // fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
// //   console.log(data);
// //   superagent
// //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
// //     .end((err, res) => {
// //       if (err) {
// //         console.log(err);
// //         return;
// //       }
// //       // console.log('test');
// //       // console.log(res.body.message);
// //       fs.writeFile('dog-img-url.txt', res.body.message, (err) => {
// //         if (err) {
// //           console.log(err);
// //           return;
// //         }
// //       });
// //     });
// // });

// // http req using core module
// // https.get("https://dog.ceo/api/breed s/image/random", (res) => {
// //     let data = "";
// //     res.on("data", (chunk) => {
// //       data += chunk;
// //       // console.log(chunk);
// //     });
// //     res.on("end", () => {
// //       console.log(data);
// //     });
// //   })
// //   .on("error", (error) => {
// //     console.log(error);
// //   });

// // Solve callback hell using promises
// // fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
// //   console.log(data);
// //   superagent
// //     .get(`https://dog.ceo/api/breed/${data}/images/random`) // at begin - pending promise , after coming with data - resolved promised
// //     // if resolved promise is fulfilled
// //     .then((res) => {
// //       // console.log('test');
// //       // console.log(res.body.message);
// //       fs.writeFile('dog-img-url.txt', res.body.message, (err) => {
// //         if (err) {
// //           console.log(err);
// //           return;
// //         }
// //       });
// //     })
// //     //if resolved promise is rejected
// //     .catch((err) => {
// //       if (err) {
// //         console.log(err.message);
// //         return;
// //       }
// //     });
// // });

// // Promisify
// // goal is to achieve promisify the file read function which instead of taking callbacks
// // simply returns us a promise which we can resolve or reject

function readFilePro(filePath) {
  const myPromise = new Promise((resolve, reject) => {
    console.log(filePath);
    // executor function which contains the main logic of async operation
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject('Alas! file could not be found ❌');
      resolve(data);
    });
  });
  return myPromise; // return promise outside the executor
}

function writeFilePro(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) reject(err);
      resolve('successfully written...✅');
    });
  });
}
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(data);
    return data;
  })
  .then((breedName) => {
    // console.log(data,'e')
    superagent
      .get(`https://dog.ceo/api/breed/${breedName}/images/random`)
      .then((res) => {
        const { message } = res.body;
        // console.log(message)
        const imageUrl = message;
        return imageUrl;
      })
      .then((imageUrl) => {
        // console.log(imageUrl,'4th chain');
        writeFilePro(`${__dirname}/dog-img-url.txt`, imageUrl)
          .then((success) => console.log(success))
          .catch((err) => console.log('errrrrrr'));
      });
  })
  .catch((error) => console.log(error));
*/
// even better way
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(data);
//     return data;
//   })
//   .then((breedName) => {
//     return superagent
//       .get(`https://dog.ceo/api/breed/${breedName}/images/random`)
//       .then((res) => {
//         const { message } = res.body;
//         const imageUrl = message;
//         return imageUrl; // <-- You are returning the  imageUrl here
//       });
//   })
//   .then((imageUrl) => {
//     return writeFilePro(`${__dirname}/dog-img-url.txt`, imageUrl)
//       .then((success) => console.log(success))
//       .catch((err) => console.log('errrrrrr'));
//   });
////////////////////////////////////////////////////////////////////////////////////////////
// consuming promises with async await
// allows us to make our code look more synchronous
async function getDogPic() {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(data);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // console.log(res.body)
    const { message } = res.body;
    // console.log(message)
    // return message;
    await writeFilePro(`${__dirname}/dog-img-url.txt`, message);
    console.log('written image url to file.....');
  } catch (err) {
    console.log(err);
  }
}
getDogPic();

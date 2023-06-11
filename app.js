const axios = require("axios"),
  cheerio = require("cheerio"),
  ora = require("ora");
nodemailer = require("nodemailer");

const Prices = {};

const sendMail = ({ productTitle, productImage, productUrl, newPrice }) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xyz@gmail.com",
      pass: "*************",
    },
  });

  let mailDetails = {
    from: "xyz@gmail.com",
    to: "abc@gmail.com",
    subject: "Hey the price has been dropped for your subscribed product.",
    text: `Hey the price has been dropped for your subscribed product.`,
    html: `<h1>${productTitle}</h1>
            <img src=${productImage}></br>
            <p>Price is ${newPrice}<p> 
            <button><a href=${productUrl}>Buy Now</button>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      throw new Error(`ERROR in sending mail.`);
    } else {
      console.log("Email sent successfully");
    }
  });
};

const FetchPrice = (productUrl) => {
  const spinner = ora("Loading....").start();
  axios
    .get(productUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
      },
    })
    .then(({ data }) => {
      const $ = cheerio.load(data);
      const price = $(".a-price-whole").text();

      const priceString = price.substring(0, price.indexOf("."));

      let priceInt = parseInt(priceString.replace(/,/g, ""));


      if (Prices[productUrl]) {
        if (Prices[productUrl] > priceInt) {
          sendMail({
            productTitle: $("#title"),
            productImage: $(".img-class"),
            productUrl: productUrl,
            newPrice: priceInt,
          });
        }
      }
      Prices[productUrl] = priceInt;
      spinner.succeed(
        `Fetched price for ${$("title")
          .text()
          .substr(0, 80)}...: Rs.${priceInt}/-`
      );
    });
};

const PRODUCTS = [
  "https://www.amazon.in/Canon-1500D-Digital-Camera-S18-55/dp/B07BS4TJ43",
  "https://www.amazon.in/dp/B0BQJLCQD3?ref_=cm_sw_r_apin_dp_Z4XT06JA7467ZH9CE9E7&tag=googmantxtdsk44-21&ascsubtag=_k_{gclid}_k_",
  "https://www.amazon.in/LG-inches-Ultra-55UQ7500PSF-Ceramic/dp/B0B3XXSB1K/ref=sr_1_1_sspa?keywords=tv&qid=1686388673&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
  "https://www.amazon.in/Lenovo-Legion-Intel-Core-10th/dp/B09Z2R77Z1/ref=sr_1_3?keywords=lenovo+legion+5&qid=1686394341&sprefix=lenovo+legion%2Caps%2C582&sr=8-3",
];

const Track = () => {
  PRODUCTS.map((prod) => {
    FetchPrice(prod);
  });
};


setInterval(Track,10000); // 10 Hrs
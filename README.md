# Amazon Price Tracker

The Amazon Price Tracker is a Node.js script that allows you to track the prices of products on Amazon. It uses web scraping to fetch the prices from product pages and sends email notifications when the prices drop below a specified threshold.

## Features

- Track prices of products on Amazon.
- Utilizes web scraping with Cheerio to extract prices from product pages.
- Sends email notifications using Nodemailer when the prices drop below the set threshold.
- Easy configuration and customization.

## Installation

1. Clone the repository or download the script file.

```bash
git clone https://github.com/your_username/amazon-price-tracker.git
```

2. Install the required dependencies by running the following command in the project directory.

```bash
npm install
```

3. Configure the email settings in the script:

- Open the "app.js" file and locate the `sendMail` function.
- Update the `user` and `pass` fields under the `auth` object with your Gmail account credentials. Note: It's recommended to use environment variables or a more secure method to store sensitive information like passwords.
- Update the `from` and `to` fields in the `mailDetails` object with the appropriate email addresses.

## Usage

1. Open the "app.js" file and locate the `PRODUCTS` array.
2. Add or remove Amazon product URLs that you want to track. Each URL should be a string element in the array.
3. Set the desired price threshold for notifications by modifying the `newPrice` comparison in the `sendMail` function.
4. In your terminal or command prompt, navigate to the project directory and run the following command:

```bash
node app.js
```

The script will start tracking the prices of the specified products on Amazon. When the prices drop below the specified threshold, it will send email notifications to the configured addresses.

## Dependencies

- axios: ^0.24.0
- cheerio: ^1.0.0-rc.10
- ora: ^6.0.1
- nodemailer: ^6.7.2

Make sure to install these dependencies before running the script.

## Support

If you encounter any issues or have any questions, please feel free to [open an issue](https://github.com/your_username/amazon-price-tracker/issues) on the GitHub repository.

## Conclusion

This README provides an overview of the "Amazon Price Tracker" project, installation instructions, and usage guidelines.

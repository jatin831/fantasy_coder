import datetime
import logging
from flask_cors import CORS

import requests
from flask import Flask, render_template, request

from paytm_checksum import generate_checksum, verify_checksum

logging.basicConfig(level=logging.DEBUG)

config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'http://127.0.0.1:3000',  # React
  ],

  'SECRET_KEY': 'Hello World'
}

app = Flask(__name__)

app.secret_key = config['SECRET_KEY']
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

# Staging configs:
# Keys from https://dashboard.paytm.com/next/apikeys
MERCHANT_ID = "wKvHLC50416086372235"
MERCHANT_KEY = "G5i%&u7m3uhLPfBi"
WEBSITE_NAME = "WEBSTAGING"
INDUSTRY_TYPE_ID = "Retail"
BASE_URL = "https://securegw-stage.paytm.in"


# Production configs:
# Keys from https://dashboard.paytm.com/next/apikeys
# MERCHANT_ID = "<MERCHANT_ID>"
# MERCHANT_KEY = "<MERCHANT_KEY>"
# WEBSITE_NAME = "<WEBSITE_NAME>"
# INDUSTRY_TYPE_ID = "<INDUSTRY_TYPE_ID>"
# BASE_URL = "https://securegw.paytm.in"


@app.route("/")
def index():
    amount = 299.88
    transaction_data = {
        "MID": "wKvHLC50416086372235",
        "WEBSITE": "WEBSTAGING",
        "INDUSTRY_TYPE_ID": "Retail",
        "ORDER_ID": str(datetime.datetime.now().timestamp()),
        "CUST_ID": "007",
        "TXN_AMOUNT": str(amount),
        "CHANNEL_ID": "WEB",
        "MOBILE_NO": "7777777777",
        "EMAIL": "example@paytm.com",
        "CALLBACK_URL": "http://127.0.0.1:5000/callback"
    }

    # Generate checksum hash
    transaction_data["CHECKSUMHASH"] = generate_checksum(transaction_data, MERCHANT_KEY)

    logging.info("Request params: {transaction_data}".format(transaction_data=transaction_data))

    url = BASE_URL + '/theia/processTransaction'
    return transaction_data


@app.route('/callback', methods=["GET", "POST"])
def callback():
    # log the callback response payload returned:
    callback_response = request.form.to_dict()
    logging.info("Transaction response: {callback_response}".format(callback_response=callback_response))

    # verify callback response checksum:
    checksum_verification_status = verify_checksum(callback_response, MERCHANT_KEY,
                                                   callback_response.get("CHECKSUMHASH"))
    logging.info("checksum_verification_status: {check_status}".format(check_status=checksum_verification_status))

    # verify transaction status:
    transaction_verify_payload = {
        "MID": callback_response.get("MID"),
        "ORDERID": callback_response.get("ORDERID"),
        "CHECKSUMHASH": callback_response.get("CHECKSUMHASH")
    }
    url = BASE_URL + '/order/status'
    verification_response = requests.post(url=url, json=transaction_verify_payload)
    logging.info("Verification response: {verification_response}".format(
        verification_response=verification_response.json()))
    print(verification_response.json())
    return "OK"

if __name__ == '__main__':
	app.run(debug=True)

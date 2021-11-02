# Twilio PayClient plugin

Twilio PayClient is a proof of concept implementation of Twilio's Pay service, offering PCI DSS payment capture on Twilio voice calls. Visit the official site for more details: [https://www.twilio.com/pay](https://www.twilio.com/pay)

This component is provided "AS IS" and no guarantees made on performance.

## Installation

Clone this repository and add Node modules..
`npm install`

## Server Setup

To use the library, you need to provide config back to the client via a server url, where the configuration can be pulled from in the below format. This version uses Twilio Functions to host all the required middleware server functions the NPM will use. These are provided under the "default" folder. These need to be deployed to Twilio Functions and the URL noted:

The below template code is used in the config file. The values can be changed.

```
    const config = {
        functionsURL: 'https://' + context.DOMAIN_NAME,     // The Twilio Functions URL. Server where "paySyncUpdate" is deployed (See server below)
        payConnector: context.PAY_CONNECTOR,                // The name of the Twilio Pay connector configured
        paySyncToken: String,                               // Sync Service Token. All maps will be created
        captureOrder: [                                     // example order of keywords.
            "payment-card-number",
            "security-code",
            "expiration-date",
        ],
        currency: 'AUD',                                    // USD is default
        tokenType: 'reusable',                              // one-time || reusable
    };
```

This can be done with any server, or for convenience, deploy the server using twilio Functions, pasting the code below into Functions and setting the Environment variables.

### Server: Using Twilio Functions

1. Create an API Key/secret to use with the services. Update the server "default/.env" with details.

2. Create a Twilio Sync Service and update PAY_SYNC_SERVICE_SID in "default/.env"

3. Create a new Pay connector and note the name of the connector. Update PAY_CONNECTOR in "default/.env"

4. Deploy the Server side with "twilio serverless:deploy". Use the Functions URL for the Merchant Server URL in PayClient.

NOTE: Once the server side is deployed, you MUST update the client src/PayComponent.js

```
let merchantServerUrl = "https://default-XXXXX.twil.io/getConfig";
```

Start the frontend plugin with

```
twilio flex:plugins:start --profile="XXXFlex"
```

## Setup

- "identity" is the Agent identity used for tracking purposes. This is not checked at present.
- "merchantURL" - the URL where the config is pulled from. Currently this is the Twilio Functions URL for "default"
- "callSid" - This is passed in from the Flex call automatically.

The client has multiple methods that can be used to drive a user interface. Some examples are given below:

```
    payClient.startCapture();
    payClient.cancelCapture();
    payClient.submitCapture();
    payClient.resetCard();
    payClient.resetSecurityCode();
    payClient.resetDate();
    payclient.updateCallSid(callSid);
```

### Events

The client has multiple events that fire and can be used to drive a User interface. Some examples are given below:

```
    payClient.on('callConnected', (callSid) => {
        payClient.updateCallSid(callSid);
    });

    payClient.on('cardUpdate', (data) => {
        this.paymentCardNumber = data.paymentCardNumber;
        this.paymentCardType = data.paymentCardType
        this.securityCode = data.securityCode
        this.expirationDate = data.expirationDate
        this.paymentToken = data.paymentToken
    };

    payClient.on('capturing', () => { });
    payClient.on('capturingCard', () => { });
    payClient.on('capturingSecurityCode', () => { });
    payClient.on('capturingDate', () => { });
    payClient.on('captureComplete', () => { });
    payClient.on('cardReset', () => { });
    payClient.on('securityCodeReset', () => { });
    payClient.on('dateReset', () => { });
    payClient.on('cancelledCapture', () => { });
    payClient.on('submitComplete', () => { });
```

7. Make a call via Twilio and extract the PSTN side call SID. This is provided to payClient as the call SID. This can be done
   at initiation or after the fact by updating the call Sid

```
    payclient.updateCallSid(callSid);
```

8. On the PSTN calling handset (customer) now enter the card details using the keypad:

- Enter a test credit card e.g. 4444 3333 2222 1111
- enter a cvc e.g. 123
- enter a future exp. date e.g. 1225

Note: If a mistake was made entering digits, call the resetXXX() methods to reset the entry.

9. When all data has been entered, "Submit" the transaction and wait for a returned token in the 'cardUpdate' event paymentToken.

# Your custom Twilio Flex Plugin

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

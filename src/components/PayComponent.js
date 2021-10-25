import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import CardView from './CardView';
import PayClient from './AgentAssistPayClient';


class PayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.payClient = null;

    this.state = {
      // Visual flags to control GUI
      callConnected: false,
      capturing: false,
      capturingCard: false,
      capturingSecurityCode: false,
      capturingDate: false,
      captureComplete: false,
      focused: 'name',
      // Card object updated by Twilio Sync
      cardData: {
        paymentCardNumber: "",
        securityCode: "",
        expirationDate: "",
        paymentToken: "",
        paymentCardType: "",
      }
    }
  }

  async componentDidMount() {
    // Set the Internal Merchant Server URL for config and Access Tokens
    let merchantServerUrl = "https://default-8440-dev.twil.io";   // TODO: Change this URL after deploying Functions.
    var callSid = this.props.task.attributes.call_sid
    try {
      this.payClient = new PayClient("Alice");

      await this.payClient.attachPay(merchantServerUrl, callSid);
      await this.payClient.startCapture();

      //Establish the listeners
      this.payClient.on("callConnected", () => {
        this.setState({
          ...this.state,
          callConnected: true,
        });
      });

      this.payClient.on("capturing", () => {
        this.setState({
          ...this.state,
          capturing: true,
        });
      });

      this.payClient.on("capturingCard", () => {
        this.setState({
          ...this.state,
          capturingCard: true,
          capturingSecurityCode: false,
          capturingDate: false,
        });
      });

      this.payClient.on("capturingSecurityCode", () => {
        this.setState({
          ...this.state,
          focused: "cvc",
          capturingSecurityCode: true,
          capturingCard: false,
          capturingDate: false,
        });
      });

      this.payClient.on("capturingDate", () => {
        this.setState({
          ...this.state,
          capturingDate: true,
          capturingCard: false,
          capturingSecurityCode: false,
        });
      });

      this.payClient.on("cardReset", () => {
        this.setState({
          ...this.state,
          capturingCard: true,
        });
      });

      this.payClient.on("securityCodeReset", () => {
        this.setState({
          ...this.state,
          capturingSecurityCode: true,
        });
      });

      this.payClient.on("dateReset", () => {
        this.setState({
          ...this.state,
          capturingDate: true,
        });
      });

      this.payClient.on("captureComplete", () => {
        this.setState({
          ...this.state,
          captureComplete: true,
        });
        this.payClient.submitCapture();
      });

      this.payClient.on("cancelledCapture", () => {
        this.setState({
          ...this.state,
          capturing: false,
          capturingCard: false,
          capturingSecurityCode: false,
          capturingDate: false,
          captureComplete: false,
        });
      });

      this.payClient.on("submitComplete", () => {
        this.setState({
          ...this.state,
          capturing: false,
          capturingCard: false,
          capturingSecurityCode: false,
          capturingDate: false,
        });

      });

      this.payClient.on("cardUpdate", (data) => {
        if (this.state.captureComplete) {
          console.log(`cardUpdate: this.state.captureComplete ${this.state.captureComplete}`);
          console.log(data)
          this.setState({
            ...this.state,
            cardData: { ...this.state.cardData, paymentToken: data.paymentToken },
            captureComplete: false
          });
        } else {
          console.log(data)
          var search = 'x';
          var replaceWith = '*';
          var modifiedCardNumber = data.paymentCardNumber.split(search).join(replaceWith);
          this.setState({
            ...this.state, cardData: {
              paymentCardNumber: modifiedCardNumber,
              securityCode: data.securityCode,
              expirationDate: data.expirationDate,
              paymentCardType: data.paymentCardType
            }
          });
        }
      });
    } catch (error) {
      console.error(`PayClient Mounted Error: ${error}`);
    }
  }

  render() {

    return (
      <CardView data={this.state} />
    )
  }
}

export default withTaskContext(PayComponent);
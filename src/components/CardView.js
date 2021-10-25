import React from 'react';
import TextField from '@material-ui/core/TextField'
import 'react-credit-cards/es/styles-compiled.css'

const overlayStyle = {
    capture: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "5vh",
        paddingTop: "5vh",
        paddingLeft: "25px",
        justifyContent: "space-around",
        alignContent: "center",
        minWidth: "350px",
        maxWdith: "350px",
    },
    complete: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "8vh",
        paddingTop: "4vh",
        paddingLeft: "25px",
        justifyContent: "center",
        alignContent: "center",
        minWidth: "350px",
        maxWdith: "350px",
    }
}

export default class CreditView extends React.Component {



    handleChange(event) {
        console.log(`Output ====> ${this.props.data}, ${[event.target.id]}, ${event.target.value}`)
        this.setState({ ...this.props.data, [event.target.id]: event.target.value })
    }

    render() {

        return (
            <div style={overlayStyle.container}>
                <TextField
                    variant="outlined"
                    id="paymentCardNumber"
                    label="Card Number"
                    style={{ margin: 8 }}
                    placeholder="4444 3333 2222 1111"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.data.cardData.paymentCardNumber}
                    onChange={this.handleChange}
                />
                <br />
                <TextField
                    id="securityCode"
                    variant="outlined"
                    label="CVC"
                    style={{ margin: 8 }}
                    placeholder="cvc"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.data.cardData.securityCode}
                    onChange={this.handleChange}
                />
                <br />
                <TextField
                    id="expirationDate"
                    variant="outlined"
                    label="Expiry Date"
                    style={{ margin: 8 }}
                    placeholder="MM/YY"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.data.cardData.expirationDate}
                    onChange={this.handleChange}
                />
                <TextField
                    id="paymentToken"
                    variant="filled"
                    label="Token"
                    style={{ margin: 8 }}
                    placeholder="awaiting token from server..."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.data.cardData.paymentToken}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
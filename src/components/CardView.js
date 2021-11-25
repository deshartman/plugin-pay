import React from 'react';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
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

export default class CardView extends React.Component {

    render() {
        return (
            <div style={overlayStyle.container}>
                <TextField
                    id="outlined-read-only-input"
                    label="Card Number"
                    value={this.props.data.cardData.paymentCardNumber}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <br />
                <TextField
                    id="outlined-read-only-input"
                    label="Card CVC"
                    value={this.props.data.cardData.securityCode}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <br />
                <TextField
                    id="outlined-read-only-input"
                    label="Exp. Date:"
                    value={this.props.data.cardData.expirationDate}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <br />
                <Typography variant="h5" gutterBottom component="div" >
                    Token:  {this.props.data.cardData.paymentToken}
                </Typography>



            </div>
        )
    }
}
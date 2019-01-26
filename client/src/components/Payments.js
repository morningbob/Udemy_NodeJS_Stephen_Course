import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		//debugger;

		return (
			// the amount is US cents
			<StripeCheckout
				name="Emaily"
				description="5 for 5 email credits"
				amount={500}
				// token is a function to receive from stripe api
				// the token from stripe is this token
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				>
				<button className="btn">
					Add Credits
				</button>
			</StripeCheckout>
		);
	}
};

export default connect(null, actions)(Payments);
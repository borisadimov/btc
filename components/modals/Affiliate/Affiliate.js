import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';

import styles from './Affiliate.sss';
import {CONFIRMATIONS} from 'models/btc';
import {math, formatMBTC} from '../../../index';
import {SATOSHI} from '../../../models/btc';


@CSSModules(styles, {allowMultiple: true})
export default class Affiliate extends Component {
  state =  {
    requestSended: false
  };

  onRequest = (event) => {
    event.preventDefault();

    const {onRequest} = this.props;
    onRequest();
    this.setState({requestSended: true});
  };

  render() {
    const {onClose, username, referralBalance} = this.props;
    let address = "https://bitcoinzebra.com/?u=" + encodeURI(username);
    let btnActive =
      math.largerEq(referralBalance, math.bignumber(SATOSHI)) &&
      !this.state.requestSended;

    return (
      <div styleName="modal modal-deposit">
        <div styleName="modal-bg" onClick={onClose}></div>
        <div styleName="modal-inner">
          <div styleName="modal-close" onClick={onClose}></div>
          <div styleName="title">Refer a friend</div>
          <div styleName="subtitle">Your personal Bitcoin deposit address is:</div>
          <div styleName="btc-address">{address}</div>

          <div styleName="subtitle">Your referral reward:</div>
          <div styleName="btc-address">{formatMBTC(referralBalance)} mB</div>

          {
            this.state.requestSended &&
              <div styleName="subtitle">Your request sent!</div>
          }

          <button styleName={`button ${btnActive ? 'button-active' : ''}`}>
            <div styleName="button-inner" onClick={this.onRequest}>Withdraw reward</div>
          </button>
        </div>
      </div>
    );
  }
}

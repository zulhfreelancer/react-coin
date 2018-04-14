import React from 'react';
import { API_URL } from '../../config';
import { handleResponse, renderChangePercent } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';

class Detail extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: {},
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.fetchCurrency(id);
  }

  componentWillReceiveProps(nextProps) {
    // check if URL has been changed
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const newCurrencyId = nextProps.match.params.id;
      this.fetchCurrency(newCurrencyId);
    }
  }

  fetchCurrency(currency_id) {
    this.setState({loading: true});

    fetch(`${API_URL}/cryptocurrencies/${currency_id}`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          loading: false,
          error: null,
          currency: data
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  render() {
    const {loading, error, currency} = this.state;
    // console.log('currency', currency);

    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            24-Hour Change <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24-Hour Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    )
  }
}

export default Detail;

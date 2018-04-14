import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null // 'Something is wrong'
    }
  }

  componentDidMount() {
    this.setState({loading: true});

    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}</span>
    }
  }

  render() {
    console.log(this.state);

    // ES6 Destructuring
    // https://www.saltycrane.com/blog/2016/03/es6-features-used-react-development/#destructuring
    const {loading, error, currencies} = this.state;

    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <Table
        coins={currencies}
        renderChangePercent={this.renderChangePercent}
      />
    )
  }
}

export default List;

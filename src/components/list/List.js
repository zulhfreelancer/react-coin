import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      totalPages: 0,
      page: 1,
      error: null // 'Something is wrong'
    }

    // allow child component to edit state inside this component (parent)
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.setState({loading: true});

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        const {currencies, totalPages} = data;
        this.setState({
          currencies: currencies,
          loading: false,
          totalPages: totalPages
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

  handlePaginationClick(direction) {
    // console.log(this);

    let nextPage = this.state.page;

    if (direction === 'next') {
      nextPage++;
    } else {
      nextPage--;
    }

    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  render() {
    console.log(this.state);

    // ES6 Destructuring
    // https://www.saltycrane.com/blog/2016/03/es6-features-used-react-development/#destructuring
    const {loading, error, currencies, page, totalPages} = this.state;

    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div>
        <Table
          coins={currencies}
          renderChangePercent={this.renderChangePercent}
        />

      <Pagination
        page={page}
        totalPages={totalPages}
        handlePaginationClick={this.handlePaginationClick}
      />
      </div>
    )
  }
}

export default List;

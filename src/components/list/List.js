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

  // when user at `page/1`, replace `1` with `2` and hit enter
  componentWillReceiveProps(nextProps) {
    let newPage;
    if (nextProps.location.pathname === "/") {
      newPage = 1;
    } else {
      newPage = nextProps.match.params.page;
    }
    this.setPageAndFetchCurrencies(newPage);
  }

  // when user type the URL manually and hit enter in browser address bar
  // or when user click their bookmark
  componentWillMount() {
    const {page} = this.props.match.params;
    if (page) { // NaN check
      this.setState({page: page});
    }
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  setPageAndFetchCurrencies(page) {
    this.setState({ page: page }, () => {
      this.fetchCurrencies();
    });
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

  handlePaginationClick(direction) {
    let nextPage = this.state.page;
    if (direction === 'next') {
      nextPage++;
    } else {
      nextPage--;
    }
    // allow user to go back from Detail page to the right page of the list
    this.props.history.push(`/page/${nextPage}`);
    this.setPageAndFetchCurrencies(nextPage);
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

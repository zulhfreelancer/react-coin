import React from 'react';
import {withRouter} from 'react-router-dom';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchQuery: '',
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;
    this.setState({searchQuery: searchQuery});

    // if searchQuery isn't present, don't send request to server
    if (!searchQuery) {
      return '';
    }

    this.setState({loading: true});

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {
        this.setState({
          loading: false,
          searchResults: result
        });
        // console.log(result);
      });
  }

  handleRedirect(currency_id) {
    // clear input and close autocomplete
    this.setState({
      searchQuery: '',
      searchResults: []
    });

    this.props.history.push(`/currency/${currency_id}`);
  }

  renderSearchResults() {
    const {searchResults, searchQuery, loading} = this.state;

    // disable `No results found.` from showing after page is loaded
    if (!searchQuery) {
      return '';
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              className="Search-result"
              key={result.id}
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) { // prevent the quick blink when first character is pressed in the input field
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">
            No results found.
          </div>
        </div>
      );
    }
  }

  render() {
    const {loading, searchQuery} = this.state;

    return (
      <div className="Search">
        <span className="Search-icon"></span>

        <input
          onChange={this.handleChange}
          className="Search-input"
          type="text"
          placeholder="Currency name"
          value={searchQuery}
        />

      {loading &&
        <div className="Search-loading">
          <Loading
            width='12px'
            height='12px'
          />
        </div>
      }

      {this.renderSearchResults()}
      </div>
    )
  }
}

export default withRouter(Search);

import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
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
        this.setState({loading: false});
        console.log(result);
      });
  }

  render() {
    const {loading} = this.state;

    return (
      <div className="Search">
        <span className="Search-icon"></span>

        <input
          onChange={this.handleChange}
          className="Search-input"
          type="text"
          placeholder="Currency name"
        />

      {loading &&
        <div className="Search-loading">
          <Loading
            width='12px'
            height='12px'
          />
        </div>
      }
      </div>
    )
  }
}

export default Search;

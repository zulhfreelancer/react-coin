import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderChangePercent } from '../../helpers';
import './Table.css';

const Table = (props) => {
  const {coins, history} = props;

  return (
    <div className="Table-container">
      <table className="Table">
        <thead className="Table-head">
          <tr>
            <th>Cryptocurrency</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24-Hour Change</th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {coins.map((currency) => (
            <tr key={currency.id} onClick={() => history.push(`/currency/${currency.id}`)}>
              <td>
                <span className="Table-rank">{currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table-dollar">$</span>
                {currency.price}
              </td>
              <td>
                <span className="Table-dollar">$</span>
                {currency.marketCap}
              </td>
              <td>
                {renderChangePercent(currency.percentChange24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// check the type of the `coins` prop
// passed by the parent component
Table.propTypes = {
  coins: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(Table);

import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import { render } from 'react-dom';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

const exchangeRatesVar = gql`
  query GetExchangeRates {
    rates(currency: "EUR") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(exchangeRatesVar);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {Number(rate).toFixed(2)}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2>My first Apollo app</h2>
      <ExchangeRates />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

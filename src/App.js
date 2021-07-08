import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from 'react-router-dom';
import BookPage from './pages/BookPage';
import Address from './pages/Address';
import Payment from './pages/Payment';
import queryString from 'query-string';
import { getUser } from './utils/mockApi';
import ThankYouPage from './pages/ThankYouPage';

export const AppContext = React.createContext({ user: undefined });

export default function App() {
  return (
    <div
      style={{
        padding: '5% 25%'
      }}
    >
      <Router>
        <AppContainer>
          <Switch>
            <Route path="/thankyou/:bookId">
              <ThankYouPage />
            </Route>
            <Route path="/step1/:bookId">
              <Address />
            </Route>
            <Route path="/step2/:bookId">
              <Payment />
            </Route>
            <Route path="/">
              <BookPage />
            </Route>
          </Switch>
        </AppContainer>
      </Router>
    </div>
  );
}

/**
 * UrlSearchParam'da userId var ise kullanıcı bilgisi için server'a gidilir.
 * Api sonucu gelene kadar loading gösterilir
 * Sonuç dönerse children return edilir
 * Server reject dönerse url'den userId silinir,loading yerine children render edilir.
 */
function AppContainer({ children }) {
  const [user, setUser] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const { search } = useLocation();
  const history = useHistory();

  const { userId } = queryString.parse(search);

  React.useEffect(() => {
    async function fillUser() {
      setLoading(true);
      getUser(userId)
        .then((res) => {
          setUser(res);
          setLoading(false);
        })
        .catch((e) => {
          history.replace({
            search: undefined
          });
          setLoading(false);
        });
    }
    userId && fillUser();
  }, [history, userId]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {loading ? 'loading...' : children}
    </AppContext.Provider>
  );
}

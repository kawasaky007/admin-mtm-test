import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './hook/useRedux';
import { actions } from './redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from './screens/auth/login/Login';
import SiderDemo from './screens/admin';
import User from './screens/admin/User';
import Categories from './screens/admin/Categories';
import { AdminRouter } from './router/adminRouter';
import Products from './screens/admin/Products';
import Banners from './screens/admin/Banners';
import ProductSale from './screens/admin/ProductSale';
const AuthRouter = () => {
  return (
    <SiderDemo>
      <Route
        path={AdminRouter.USER.path}
        component={User}
      />
      <Route
        path={AdminRouter.CATEGORIES.path}
        component={Categories}
      />
      <Route
        path={AdminRouter.PRODUCTS.path}
        exact
        component={Products}
      />
      <Route
        path={AdminRouter.PRODUCTS_SALE.path}
        exact
        component={ProductSale}
      />
      <Route
        path={AdminRouter.BANNERS.path}
        exact
        component={Banners}
      />


    </SiderDemo>
  )
}
function App(props: any) {
  const token = useAppSelector(state => state.auth.token);
  useEffect(() => {

  }, [token])

  return (

    <Route>
      <Switch>

        <Route path="/admin"
          render={() => {
            return token ? <AuthRouter /> : <Redirect to="/" />;
          }}

        />
        <Route path="/"

          component={Login} />

      </Switch>
    </Route>
  );
}

export default withRouter(App);

import React, { useEffect } from "react";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";

import { bootstrap } from "../actions/app";
import { IRootReducerState } from "../reducers";
import PrivateRoute from "./PrivateRoute";
import TransactionsContainer from "../containers/TransactionsContainer";
import TransactionDetailContainer from "./TransactionDetailContainer";
import SignIn from "../containers/SignIn";
import SignUp from "../containers/SignUp";
import TransactionCreateContainer from "./TransactionCreateContainer";
import NotificationsContainer from "./NotificationsContainer";
import UserSettingsContainer from "./UserSettingsContainer";
import BankAccountsContainer from "./BankAccountsContainer";
import BankAccountCreateContainer from "./BankAccountCreateContainer";

interface StateProps {
  isBootstrapped: boolean;
  isLoggedIn: boolean;
}

interface DispatchProps {
  bootstrapApp: () => void;
}

type Props = StateProps & DispatchProps;

const App: React.FC<Props> = ({ isBootstrapped, bootstrapApp }) => {
  useEffect(() => {
    if (!isBootstrapped) {
      bootstrapApp();
    }
  });


  console.log('testing');

  return (
    <Switch>
      <PrivateRoute exact path={"/(public|contacts|personal)?"}>
        <TransactionsContainer />
      </PrivateRoute>
      <PrivateRoute exact path="/user/settings">
        <UserSettingsContainer />
      </PrivateRoute>
      <PrivateRoute exact path="/notifications">
        <NotificationsContainer />
      </PrivateRoute>
      <PrivateRoute exact path="/bankaccount/new">
        <BankAccountCreateContainer />
      </PrivateRoute>
      <PrivateRoute exact path="/bankaccounts">
        <BankAccountsContainer />
      </PrivateRoute>
      <PrivateRoute exact path="/transaction/new">
        <TransactionCreateContainer />
      </PrivateRoute>
      <PrivateRoute exact path="/transaction/:transactionId">
        <TransactionDetailContainer />
      </PrivateRoute>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state: IRootReducerState) => ({
  isBootstrapped: state.app.isBootstrapped,
  isLoggedIn: state.user.isLoggedIn
});

const dispatchProps = {
  bootstrapApp: bootstrap
};

export default connect(mapStateToProps, dispatchProps)(App);

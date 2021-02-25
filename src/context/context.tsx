import React, { PureComponent, ReactNode } from 'react';
import { Budget } from '../types';
import * as types from './contextType';

interface Props {}

interface State {
  budgets: Budget[];
  dispatch: (action: types.Actions) => void;
}

const state: State = {
  budgets: [],
  dispatch: (action: types.Actions) => console.log('Hey there'),
};

const context = React.createContext<State>(state);

class Provider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { ...state, dispatch: this.dispatch };
  }

  dispatch = (action: types.Actions) => {
    switch (action.type) {
      case types.addBudget:
        return this.setState({
          ...this.state,
          budgets: [...this.state.budgets, action.payload],
        });
      case types.deleteBudget:
        return this.setState({
          ...this.state,
          budgets: this.state.budgets.filter((b) => b.name !== action.payload),
        });
      default:
        return this.setState({ ...this.state });
    }
  };

  render(): ReactNode {
    return (
      <context.Provider value={this.state}>
        {this.props.children}
      </context.Provider>
    );
  }
}

export { context };
export default Provider;

import React, { PureComponent, ReactNode } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as fb from '../firebase';
import { Budget } from '../types';
import * as types from './contextType';
import * as actions from './contextActions';

interface Props {}

interface State {
  budgets: Budget[];
  categories: string[];
  dispatch: (action: types.Actions) => void;
}

const state: State = {
  categories: [],
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
      case types.AddBudget_Category:
        return this.setState({
          ...this.state,
          budgets: [...this.state.budgets, action.payload.budget],
          categories: [...this.state.categories, action.payload.category],
        });
      case types.deleteBudget:
        return this.setState({
          ...this.state,
          budgets: this.state.budgets.filter((b) => b.name !== action.payload),
          categories: this.state.categories.filter((c) => c !== action.payload),
        });
      case types.updateBudget: {
        const index = this.state.budgets.findIndex(
          (b) => b.name === action.payload.name
        );
        console.log({ index, conctext: 'context' });
        const budgets = [...this.state.budgets];

        if (index === -1) budgets.push(action.payload);
        else budgets[index] = action.payload;

        return this.setState({
          ...this.state,
          budgets,
        });
      }
      default:
        return this.setState({ ...this.state });
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({
          categories: (await fb.getCategories()) ?? [],
        });

        const b = await fb.getBudgetOld();
        if (b) {
          console.log({ b });
          b.name = 'default';
          this.dispatch(actions.addBudget_And_Category(b, 'default'));
          fb.saveCategories([...this.state.categories, 'default']);
          fb.saveBudget(b);
          fb.deleteDoc();
        }
      }
    });
  }

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

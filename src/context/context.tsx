import React, { PureComponent, ReactNode } from 'react';

interface Props {}
interface State {}

const context = React.createContext<State>({});

class Context extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render(): ReactNode {
    return (
      <context.Provider value={this.state}>
        {this.props.children}
      </context.Provider>
    );
  }
}

export default Context;

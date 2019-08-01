import { Component, ReactNode } from 'react';

export default abstract class BaseComponent<Props, State> extends Component<
    Props,
    State
> {
    abstract renderFunction: (props: Props, state: State) => ReactNode;
    public render = () => this.renderFunction(this.props, this.state);
}

import { Component } from "react";
import "./EditorHome.css";
import { EditorHomeRender } from "./EditorHomeRender";

export interface IEditorHomeProps {}
export interface IEditorHomeState {}

class EditorHome extends Component<IEditorHomeProps, IEditorHomeState> {
  state: IEditorHomeState = {};
  async componentDidMount() {}

  render = () => EditorHomeRender(this.props, this.state);
}

export default EditorHome;

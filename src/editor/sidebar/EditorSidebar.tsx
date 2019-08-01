import "./EditorSidebar.css";
import * as React from "react";
import { IEditorServerState, IMenuItem } from "../state/EditorState";
import { NavLink } from "react-router-dom";
import { IEventService } from "../../core/event";
import { Inject } from "../../core/ioc";
import { autobind } from "../../core/autobind";

interface IProps {
  editorState: IEditorServerState;
}
interface IState {}

export default class EditorSidebar extends React.Component<IProps, IState> {
  state: IState = {};

  componentDidMount() {
    console.log("sidebar: ", this.props.editorState);
  }

  render() {
    return (
      <div className="editor-sidebar">
        (editor sidebar)
        {this.props.editorState.fileMenu.root.map(menuItem => (
          <SidebarMenuItem key={menuItem.id} menuItem={menuItem} />
        ))}
      </div>
    );
  }
}

class SidebarMenuItem extends React.Component<{ menuItem: IMenuItem }, {}> {
  render() {
    const { menuItem } = this.props;
    return (
      <div style={{ paddingLeft: "5px" }}>
        {menuItem.isFolder ? (
          <span>{menuItem.name}</span>
        ) : (
          <NavLink className="menu-link" to={getContentUrl(menuItem)}>
            {menuItem.name}
          </NavLink>
        )}
        <div>
          {(menuItem.children || []).map(menuItemChild => (
            <SidebarMenuItem key={menuItemChild.id} menuItem={menuItemChild} />
          ))}
        </div>
      </div>
    );
  }
}

const getContentUrl = (menuItem: IMenuItem) => {
  return `/text-editor/file/${menuItem.id}`;
};

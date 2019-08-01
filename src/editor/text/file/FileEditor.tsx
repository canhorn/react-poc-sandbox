import "./FileEditor.css";
import * as React from "react";
import { RouteChildrenProps } from "react-router";
import Editor from "@monaco-editor/react";
import {
  IServerFile,
  setFileContent,
  getFile,
  listenForMainContentChange,
  removeListenerForContentChange,
  DEFAULT_FILE
} from "../../state/EditorState";

interface IRouterParams {
  fileId: string;
}
export interface IFileEditorProps extends RouteChildrenProps<IRouterParams> {}
export interface IFileEditorState {
  fileId: string;
  file: IServerFile;
  options: {
    selectOnLineNumbers: boolean;
  };
}

class FileEditor extends React.Component<IFileEditorProps, IFileEditorState> {
  state: IFileEditorState = {
    fileId: "not-valid",
    file: DEFAULT_FILE,
    options: {
      selectOnLineNumbers: true
    }
  };
  private _onChangeHandler!: string;
  async componentDidMount() {
    this._onChangeHandler = listenForMainContentChange(
      this.onContentChanged,
      this
    );
  }
  componentWillUnmount() {
    removeListenerForContentChange(this._onChangeHandler);
  }
  private onContentChanged() {
    try {
      if(!this.props.match) {
        return;
      }
      this.setState({
        fileId: this.props.match.params.fileId,
        file: DEFAULT_FILE
      });
      getFile(this.props.match.params.fileId)
        .then(file => {
          this.setState({
            file
          });
        })
        .catch(error => console.error("Error", error));
    } catch (ex) {
      console.error("Error", ex);
    }
  }
  editorDidMount = (getCurrentValue: () => string, editor: any) => {
    console.log("editorDidMount", { getCurrentValue, editor });
    // editor.focus();
    // TODO: Wire to onChange to make sure state is updated
    if (this.props.match !== null) {
      console.log("DidMount", this.props.match.params.fileId as string);
      getFile(this.props.match.params.fileId).then(file =>
        this.setState({
          file
        })
      );
    }
  };
  onChange = (newValue: string, e:any) => {
    console.log(this.state.fileId);
    if (this.state.fileId === "not-valid") {
      return;
    }
    console.log("onChange", newValue, e);
    setFileContent(this.state.fileId, newValue);
  };
  componentDidUpdate(prevProps: IFileEditorProps) {
    if(!prevProps.match || !this.props.match) {
      return;
    }
    if (prevProps.match.params.fileId !== this.props.match.params.fileId) {
      this.setState({
        fileId: this.props.match.params.fileId,
        file: DEFAULT_FILE
      });
      getFile(this.props.match.params.fileId)
        .then(file => {
          if(!this.props.match) {
            return;
          }
          this.setState({
            fileId: this.props.match.params.fileId,
            file
          });
        })
        .catch(error => console.error("Error", error));
    }
  }

  render() {
    const { file } = this.state;
    let fileId = "invalid"
    if(this.props.match) {
      fileId = this.props.match.params.fileId
    }
    return (
      <div className="text-editor">
        <div>({fileId})</div>
        <Editor
          key="something"
          width="100%"
          height={300}
          language="json"
          theme="dark"
          value={file.content}
          options={this.state.options}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

export default FileEditor;

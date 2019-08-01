import { IEventService } from "../../core/event";
import { Inject } from "../../core/ioc";
import { createEditorStateUpdatedEvent } from "./EditorStateUpdated";

interface InternalState {
  editorState: IEditorServerState;
  serverFileMap: Map<string, IServerFile>;
}

const STATE: InternalState = {
  editorState: {
    fileMenu: {
      root: []
    }
  },
  serverFileMap: new Map<string, IServerFile>()
};

export const DEFAULT_FILE: IServerFile = {
  id: "invalid-id",
  type: "plaintext",
  content: "Loading..."
};

export const setEditorState = (
  editorState: IEditorServerState,
  eventService: IEventService = Inject(IEventService)
) => {
  Object.assign(STATE.editorState, editorState);
  eventService.publish(createEditorStateUpdatedEvent());
};

export const getEditorState = () => STATE.editorState;

/**
 * ====================
 */

export const setFileContent = (id: string, content: string): void => {
  const file = STATE.serverFileMap.get(id) || { id, type: "new", content };
  const updatedFile = Object.assign({}, file, { content }) as IServerFile;
  STATE.serverFileMap.set(id, updatedFile);
};

export const getFile = async (id: string): Promise<IServerFile> => {
  const file = STATE.serverFileMap.get(id);
  if (!file) {
    // Request file content
    return getFileContent(id);
  }
  return file;
};
export const getFileFromMap = (id: string): IServerFile | undefined => {
  return STATE.serverFileMap.get(id);
};

export const getFileContent = (fileContentId: string) =>
  new Promise<IServerFile>((resolve, reject) => {
    fetch(`/serverData/content/${fileContentId}.json`)
      .then(response => response.json())
      .then(result => {
        // TODO: Cache content
        STATE.serverFileMap.set(fileContentId, result);
        publishContentChanged();
        return result;
      })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });

export const loadFileContentFromServerForMenuItem = (menuItem: IMenuItem) => {};

const MAIN_CONTENT_CHANGE_LISTENER: Map<string, IEventListener> = new Map<
  string,
  IEventListener
>();

export const listenForMainContentChange = (
  notificationFunction: () => void,
  context: any
): string => {
  const handler = guid();
  MAIN_CONTENT_CHANGE_LISTENER.set(handler, {
    notificationFunction,
    context
  });
  return handler;
};
export const removeListenerForContentChange = (handler: string): void => {
  MAIN_CONTENT_CHANGE_LISTENER.delete(handler);
};
export const publishContentChanged = () => {
  MAIN_CONTENT_CHANGE_LISTENER.forEach(changeListener => {
    changeListener.notificationFunction.call(changeListener.context);
  });
};

interface IEventListener {
  notificationFunction: () => void;
  context: any;
}

export interface IEditorServerState {
  fileMenu: {
    root: Array<IMenuItem>;
  };
}
export interface IServerFile {
  id: string;
  type: "json" | "csharp" | "javascript" | "plaintext";
  content: string;
}
export interface IMenuItem {
  id: string;
  name: string;
  path: Array<string>;
  isFolder: boolean;
  children: Array<IMenuItem>;
}

function guid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

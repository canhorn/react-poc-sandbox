import { setEditorState } from "./EditorState";
import { sendErrorMessage } from "../../notificationCenter/send/SendErrorMssage";

export const fetchEditorState = (): Promise<void> =>
  fetch("serverData/editor-data.json")
    .then(response => response.json())
    .then(result => setEditorState(result))
    .catch(error =>
      sendErrorMessage("Fetch Editor State Error", JSON.stringify(error))
    );

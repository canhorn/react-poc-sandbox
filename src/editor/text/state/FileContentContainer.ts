const STATE: { fileContent: Map<string, string> } = {
  fileContent: new Map<string, string>()
};

export const setFileContent = (fileId: string, fileContent: string): void => {
  STATE.fileContent.set(fileId, fileContent);
};

export const getFileContentFromContainer = (fileId: string): string =>
  STATE.fileContent.get(fileId) || "";

setFileContent("js", "// I am JS content!!");
setFileContent("csx", "// I am JS content!!");
setFileContent("json", JSON.stringify({ comment: "I am JSON!" }));

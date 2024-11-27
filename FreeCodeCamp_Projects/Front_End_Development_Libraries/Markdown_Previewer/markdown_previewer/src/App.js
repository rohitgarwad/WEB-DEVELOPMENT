import { marked } from "marked";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "./styles.css";

function App() {
  useEffect(() => {
    Prism.highlightAll();
  });
  const defaultValue = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

  const [inputValue, setInputValue] = useState(defaultValue);
  const handleEditorOnClick = () => {
    const editorContainer = document.querySelector(".editorContainer");
    const previewerContainer = document.querySelector(".previewerContainer");
    const arrowElement = document.querySelector(".editorContainerArrow");

    previewerContainer.classList.toggle("hide");
    editorContainer.classList.toggle("maximized");
    arrowElement.classList.toggle("fa-arrows-alt");
    arrowElement.classList.toggle("fa-compress");
  };

  const handlePreviewerOnClick = () => {
    const editorContainer = document.querySelector(".editorContainer");
    const previewerContainer = document.querySelector(".previewerContainer");
    const arrowElement = document.querySelector(".previewerContainerArrow");

    previewerContainer.classList.toggle("maximized");
    editorContainer.classList.toggle("hide");
    arrowElement.classList.toggle("fa-arrows-alt");
    arrowElement.classList.toggle("fa-compress");
  };

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const getMarkdown = (input) => {
    if (input) {
      let markdown = marked(input, { sanitize: true, breaks: true });
      return { __html: markdown };
    }
  };

  return (
    <div className="App">
      <div className="editorContainer">
        <div className="toolbar">
          <i className="fa fa-free-code-camp"></i>
          Editor
          <i
            className="fa fa-arrows-alt editorContainerArrow"
            onClick={handleEditorOnClick}
          ></i>
        </div>
        <textarea id="editor" type="text" onChange={handleOnChange}>
          {inputValue}
        </textarea>
      </div>

      <div className="previewerContainer">
        <div className="toolbar">
          <i className="fa fa-free-code-camp"></i>
          Previewer
          <i
            className="fa fa-arrows-alt previewerContainerArrow"
            onClick={handlePreviewerOnClick}
          ></i>
        </div>
        <div
          id="preview"
          className="language-javascript"
          dangerouslySetInnerHTML={getMarkdown(inputValue)}
        ></div>
      </div>
    </div>
  );
}

export default App;

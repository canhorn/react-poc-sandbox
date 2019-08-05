import React from 'react';
import './EditorHome.css';

export default function EditorHome() {
    return (
        <div className="editor-home">
            <h1>Editor Home</h1>
            <h3>PoC/Features</h3>
            <ul>
                <li>
                    The layout of the page is created using{' '}
                    <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">
                        CSS Grid.
                    </a>
                </li>
                <li>
                    <span style={{ fontWeight: 'bold' }}>Text Editor: </span>{' '}
                    Using the{' '}
                    <a href="https://microsoft.github.io/monaco-editor/index.html">
                        Monaco Editor
                    </a>
                    , from Microsoft, we are able to edit text files.
                </li>
                <li>
                    <span style={{ fontWeight: 'bold' }}>Skill Editor:</span>{' '}
                    The skill editor uses{' '}
                    <a href="https://developer.microsoft.com/en-us/fabric">
                        UI Fabric
                    </a>{' '}
                    to create a responsive UX to edit the details about skills
                    used by the EventHorizon GDK.
                    <div style={{ fontWeight: 'bold' }}>
                        Skill Editor Features
                    </div>
                    <ul>
                        <li>
                            <span style={{ fontWeight: 'bold' }}>
                                Skill List:
                            </span>{' '}
                            Contains a search, which a deep search of all
                            content in the skills.
                        </li>
                        <li>
                            <span style={{ fontWeight: 'bold' }}>
                                Tutorial:
                            </span>{' '}
                            The lists have attached Tutorial Bubbles that help
                            with some general usages, helps to clean the UI.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

import './styles.css';
import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Editor from './editor/Editor';
import { setupIoC } from './SetupIoC';
import NotificationCenter from './notificationCenter/NotificationCenter';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { FluentCustomizations } from "@uifabric/fluent-theme";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

setupIoC();
initializeIcons();

function App() {
    return (
        <Fabric>
            <div className="App">
                <Router>
                    <NavLink to="/">Home</NavLink> {' | '}
                    <NavLink to="/text-editor">Text Editor</NavLink> {' | '}
                    <NavLink to="/skill-editor">Skill Editor</NavLink>
                    <Switch>
                        <Route path="/" component={Editor} />
                    </Switch>
                </Router>
                <NotificationCenter />
            </div>
        </Fabric>
    );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);

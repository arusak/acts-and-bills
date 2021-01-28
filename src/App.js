import React from 'react';
import './style/App.css';
import './style/table.css';
import {ActComponent} from './act.component.jsx';
import {BillComponent} from './bill.component.jsx';
import {Switch, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

function App() {
    const {reportDate, rangeStart, rangeEnd, total, tasks, placeholders, documentTitle} = window.reportData;
    const actProps = {reportDate, rangeStart, rangeEnd, total, tasks, placeholders};
    const billProps = {reportDate, rangeStart, rangeEnd, total, tasks, placeholders};
    window.document.title = documentTitle;

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/act">
                        <ActComponent {...actProps}/>
                    </Route>
                    <Route path="/bill">
                        <BillComponent {...billProps}/>
                    </Route>
                    <Route path="/">
                        <div>Go to /act or /bill path</div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

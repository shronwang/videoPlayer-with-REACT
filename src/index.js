import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoWrapper from './VideoWrapper';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<VideoWrapper />, document.getElementById('root'));
registerServiceWorker();

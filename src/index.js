import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
document.title = 'NBA Manager Union 2023 Playoffs Predictions';

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import '@wcj/dark-mode';
import Markdown from './Markdown';
import data from '../../README.md';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Fragment>
    <dark-mode permanent light="Light" dark="Dark"></dark-mode>
    <Markdown {...data} />
  </Fragment>,
);

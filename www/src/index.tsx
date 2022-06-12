import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import GitHubCorners from '@uiw/react-github-corners';
import '@wcj/dark-mode';
import Markdown from './Markdown';
import data from '../../README.md';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Fragment>
    <GitHubCorners target="__blank" position="right" fixed href="https://github.com/jaywcjlove/generate-password" />
    <dark-mode permanent light="Light" dark="Dark"></dark-mode>
    <Markdown {...data} />
  </Fragment>,
);

import { useEffect, useRef } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import CodeLayout from 'react-code-preview-layout';
import { getMetaId, CodeBlockData, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';
import styled from 'styled-components';
import { Element, Root } from 'react-markdown/lib/ast-to-react';

const StyleWarpper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: 60px;
  & img {
    background-color: transparent !important;
  }
`;

interface CodePreviewProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  inline?: boolean;
  node: Element | Root;
  data: CodeBlockData;
}

const CodePreview: any = ({ inline, data, node, ...props }: CodePreviewProps) => {
  const $dom = useRef<HTMLDivElement>(null);
  const { 'data-meta': meta, ...rest } = props as any;

  useEffect(() => {
    if ($dom.current) {
      const parentElement = $dom.current.parentElement;
      if (parentElement && parentElement.parentElement) {
        parentElement.parentElement.replaceChild($dom.current, parentElement);
      }
    }
  }, [$dom]);

  if (inline || !isMeta(meta)) {
    return <code {...props} />;
  }
  const line = node.position?.start.line;
  const metaId = getMetaId(meta) || String(line);
  const Child = data.components[`${metaId}`];
  if (metaId && typeof Child === 'function') {
    const code = data.data[metaId].value || '';
    const param = getURLParameters(meta);
    return (
      <CodeLayout ref={$dom} toolbar={param.title || 'Example'} code={<pre {...rest} />} text={code}>
        <Child />
      </CodeLayout>
    );
  }
  return <code {...rest} />;
};

export default function Markdown(data: CodeBlockData) {
  return (
    <StyleWarpper>
      <MarkdownPreview
        source={data.source}
        disableCopy={true}
        components={{
          code: (props) => {
            return <CodePreview {...props} data={data} />;
          },
        }}
      />
    </StyleWarpper>
  );
}

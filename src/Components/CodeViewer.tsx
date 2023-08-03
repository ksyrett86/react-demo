import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface ICodeViewerProps {
    language: string;
}

export default class CodeViewer extends React.Component<ICodeViewerProps> {

    public render() {
        return (
            <SyntaxHighlighter language={this.props.language} useInlineStyles={false} showLineNumbers wrapLines>
                {this.props.children}
            </SyntaxHighlighter>
        )
    }
}
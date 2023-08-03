import { NeoModel } from '@singularsystems/neo-core';
import { Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import React from 'react';
import CodeViewer from './CodeViewer';

export interface ICodeBlock {
    code: string;
    language: string;
    title?: string;
}

interface IModalInfo { 
    title: string;
    code: ICodeBlock[];
}

@NeoModel
export class CodeViewerModalVM extends Views.ViewModelBase {

    public modalInfo: IModalInfo | null = null;
}

@observer
export default class CodeViewerModal extends React.Component<{ viewModel: CodeViewerModalVM }> {

    public render() {
        const viewModel = this.props.viewModel;

        return (
            <Neo.Modal title={viewModel.modalInfo?.title ?? ""} bindModel={viewModel.meta.modalInfo} size="xl">
                {(modalInfo: IModalInfo) => modalInfo.code.map(block => (
                    <div className="code-block-container">
                        {block.title && <div className="code-block-title">{block.title}</div>}
                        <CodeViewer language={block.language}>
                            {block.code}
                        </CodeViewer>
                    </div>
                    
                ))}
            </Neo.Modal>
        )
    }
}
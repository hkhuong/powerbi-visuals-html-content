// External dependencies
    import * as React from 'react';

// Internal dependencies
    import {
        IVisualContentProps
    } from '../interfaces';
    import { VisualConstants } from '../VisualConstants';
    import VisualIFrame from './VisualIFrame';

    export class VisualContent extends React.Component<IVisualContentProps, {}> {

        render() {
            console.log('Content-re-render');
            console.log(this.props);
            return (
                <div id = 'customHtmlContent'
                    dangerouslySetInnerHTML = {{
                        __html: this.getEnclosedBodyContent()
                    }}
                />
            );
        }

        private getEnclosedBodyContent() {
            return (this.props.advancedEditing?.body || VisualConstants.advancedEditing.body.content)
                .replace(VisualConstants.advancedEditing.body.dataSetToken, this.getBodyRowContent())
        }

        private getBodyRowContent() {
            switch (true) {
                case this.props.usesHtmlContentDataRole: {
                    return this.renderHtmlContentDataRole().join('');
                }
            }
        }

        private renderHtmlContentDataRole() {
            console.log(this.state);
            return this.props.htmlContentEntries.map((c) => (
                    (this.props.advancedEditing?.row || VisualConstants.advancedEditing.body.content)
                        .replace(VisualConstants.advancedEditing.row.dataRowToken, c)
                )
            );
        }

    }

    export default VisualContent;
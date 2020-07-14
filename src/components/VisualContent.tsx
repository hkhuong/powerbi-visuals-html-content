// External dependencies
    import * as React from 'react';

// Internal dependencies
    import {
        IVisualContentProps
    } from '../interfaces';
    import { VisualConstants } from '../VisualConstants';

    export class VisualContent extends React.Component<IVisualContentProps, {}> {

        render() {
            console.log('Content-re-render');
            // console.log(this.props);
            return (
                <div
                    id = 'customHtmlContent'
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
            return this.renderValues().join('');
        }

        private renderValues() {
            // console.log(this.state);
            
            return this.props.visualData.values.map((c) => (
                    (this.props.advancedEditing?.row || VisualConstants.advancedEditing.body.content)
                        .split(VisualConstants.advancedEditing.row.dataRowToken)
                        .join(Object.keys(c).map((k) => c[k]).join(''))
                )
            );
        }

    }

    export default VisualContent;
// External dependencies
    import * as React from 'react';

// Internal dependencies
    import {
        IVisualContentProps
    } from '../interfaces';
import { VisualConstants } from '../VisualConstants';

    export class VisualContent extends React.Component<IVisualContentProps, {}> {
        render() {
            switch (true) {
                case this.props.usesHtmlContentDataRole: {
                    return this.renderHtmlContentDataRole();
                }
            }
        }

        private renderHtmlContentDataRole() {
            console.log(this.state);
            return this.props.htmlContentEntries.map((c) => (
                    <div
                        className = { VisualConstants.dom.entryClassSelector } 
                        dangerouslySetInnerHTML={{
                            __html: c
                            }} 
                    />
                )
            );
        }

    }

    export default VisualContent;
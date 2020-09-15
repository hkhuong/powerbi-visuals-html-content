// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// Internal dependencies
    import { VisualConstants } from '../../VisualConstants';
    import { VisualContentProps } from '../../defs/standard';
    import VisualContent from './VisualContent';

/**
 * Deals with the regular visual display, when not using advanced editing
 */
    export default class StandardDisplay extends React.Component<VisualContentProps, {}> {
            render() {
                const {
                    visualData,
                    advancedEditing,
                    contentFormatting,
                    host
                } = this.props;
                return (
                        <OverlayScrollbarsComponent
                            options = { VisualConstants.dom.scrollbars }
                        >
                            <div
                                id = 'standardDisplay' 
                                className = 'w3-container'
                            >
                                <VisualContent
                                    visualData = { visualData }
                                    advancedEditing = { advancedEditing }
                                    contentFormatting = { contentFormatting }
                                    host = { host }
                                />
                            </div>
                        </OverlayScrollbarsComponent>
                );
            }
    }
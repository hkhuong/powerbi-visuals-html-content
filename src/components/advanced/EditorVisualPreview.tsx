// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// Internal dependencies
    import { EditorVisualPreviewProps } from '../../defs/advanced';
    import VisualContent from '../standard/VisualContent';

/**
 * Preview area (main display) component of advanced editor UI
 */
    export default class EditorVisualPreview extends React.Component<EditorVisualPreviewProps, {}> {
        render() {
            return (
                <main>
                    <div className = 'w3-container visual-preview'>
                    
                        <VisualContent 
                            visualData = { this.props.visualData }
                            advancedEditing = { this.props.advancedEditing }
                            contentFormatting = { this.props.contentFormatting }
                            host = { this.props.host }
                        />
                    </div>
                </main>
            );
        }
    }
// External dependencies
    import * as React from 'react';
// Internal dependencies
    import { AdvancedEditorProps } from '../../defs/advanced';
    import EditorHeader from './EditorHeader';
    import EditorSidebar from './EditorSidebar';
    import EditorVisualPreview from './EditorVisualPreview';

/**
 * Entry point for advanced editor UI
 */
    export default class AdvancedEditor extends React.Component<AdvancedEditorProps, {}> {

        render() {
            const {
                localisationManager,
                visualData,
                advancedEditing,
                contentFormatting,
                host,
                advancedEditingObjectMetadata,
                editorOptions
            } = this.props;
            return (
                <div
                    id = 'advancedEditor'
                    className = 'w3-border'
                    style = {{
                        gridTemplateColumns: `${editorOptions?.maxMarginFactor}% auto`
                    }}
                >
                    <EditorHeader
                        localisationManager = { localisationManager }
                        host = { host }
                    />
                    <EditorSidebar
                        localisationManager = { localisationManager }
                        host = { host }
                        advancedEditing = { advancedEditing }
                        advancedEditingObjectMetadata = { advancedEditingObjectMetadata }
                        visualData = { visualData }
                        editorOptions = { editorOptions }
                    />
                    <EditorVisualPreview
                        visualData = { visualData }
                        advancedEditing = { advancedEditing }
                        contentFormatting = { contentFormatting }
                        host = { host }
                        localisationManager = { localisationManager }
                    />
                </div>
            );
        }
    }
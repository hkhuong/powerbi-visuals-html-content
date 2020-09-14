// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// Internal dependencies
    import { EditorSidebarProps } from '../../defs/advanced';
    import AccordionFold from './AccordionFold';
    import { VisualConstants } from '../../VisualConstants';
    import { VisualSettings } from '../../VisualSettings';

/**
 * Sidebar (nav) component of advanced editor UI
 */
    export default class EditorSidebar extends React.Component<EditorSidebarProps, {}> {
        render() {
            const {
                advancedEditing,
                advancedEditingObjectMetadata,
                host,
                localisationManager,
                visualData,
                editorOptions
            } = this.props;
            return (
                <nav
                    className = 'w3-border-right editor-sidebar'
                >
                    {/* <OverlayScrollbarsComponent
                        options = { VisualConstants.dom.scrollbars }
                    > */}
                        {/* <div className = 'w3-container editor-sidebar os-host-flexbox'> */}
                            <div
                                id = 'editorHelpText'
                                className = 'w3-border-bottom assistive'
                            >
                                <p>
                                    { localisationManager.getDisplayName('Advanced_Editor_Description_Options') }
                                </p>
                            </div>
                            <div id = 'editorAccordion'>
                                <AccordionFold
                                    host = { host }
                                    selectorIdSuffix = { VisualConstants.dom.htmlContentEditorIdSelectorSuffix }
                                    heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Row') }
                                    assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Row_Description') }
                                    propertyName = 'row'
                                    currentValue = { advancedEditing.row }
                                    defaultValue = { VisualSettings.getDefault()['advancedEditing'].row }
                                    advancedEditingObjectMetadata = { advancedEditingObjectMetadata }
                                    eventKey = { 2 }
                                    editorMode = 'html'
                                    columns = { this.props.visualData.columns }
                                    localisationManager = { localisationManager }
                                    editorOptions = { editorOptions }
                                />
                                <AccordionFold
                                    host = { host }
                                    selectorIdSuffix = { VisualConstants.dom.htmlBodyEditorIdSelectorSuffix }
                                    heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Body') }
                                    assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Body_Description') }
                                    propertyName = 'body'
                                    currentValue = { advancedEditing.body }
                                    defaultValue = { VisualSettings.getDefault()['advancedEditing'].body }
                                    advancedEditingObjectMetadata = { advancedEditingObjectMetadata }
                                    eventKey = { 1 }
                                    editorMode = 'html'
                                    columns = { visualData.columns }
                                    localisationManager = { localisationManager }
                                    editorOptions = { editorOptions }
                                />
                                <AccordionFold
                                    host = { host }
                                    selectorIdSuffix = { VisualConstants.dom.stylesheetEditorIdSelectorSuffix }
                                    heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Stylesheet') }
                                    assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Stylesheet_Description') }
                                    propertyName = 'stylesheet'
                                    currentValue = { advancedEditing.stylesheet }
                                    defaultValue = { VisualSettings.getDefault()['advancedEditing'].stylesheet }
                                    advancedEditingObjectMetadata = { advancedEditingObjectMetadata }
                                    eventKey = { 0 }
                                    editorMode = 'css'
                                    columns = { null }
                                    localisationManager = { localisationManager }
                                    editorOptions = { editorOptions }
                                />
                            </div>
                        {/* </div> */}
                    {/* </OverlayScrollbarsComponent> */}
                </nav>
            );
        }
    }
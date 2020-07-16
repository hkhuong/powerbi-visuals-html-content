// External dependencies
    import * as React from 'react';
    import {
        Accordion
    } from 'react-bootstrap';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

// Internal dependencies
    import {
        VisualConstants
    } from '../VisualConstants';
    import {
        IAdvancedEditorProps,
        IAdvancedEditorState
    } from '../interfaces';
    import VisualContent from './VisualContent';
    import AdvancedEditorArea from './AdvancedEditorArea';
    import { VisualSettings } from '../VisualSettings';

    export class AdvancedEditor extends React.Component<IAdvancedEditorProps, {}> {

        render() {
            const {
                localisationManager
            } = this.props;
            return (
                <div
                    className = 'container-fluid vh-100 border d-flex flex-column flex-grow-1 overflow-hidden'
                    id = 'advancedEditor'
                >
                    {/* Outer layout  */}
                    <div className = 'row border-bottom p-0'>
                        <div className = 'col-4 editors-heading border-right pl-1'>
                            <h5>
                                { localisationManager.getDisplayName("Advanced_Editor_Heading_Options") }
                            </h5>
                            <p className = 'text-muted small'>
                                { localisationManager.getDisplayName("Advanced_Editor_Description_Options") }
                            </p>
                        </div>
                        <div className = 'col visual-heading pl-1'>
                            <h5>
                                { localisationManager.getDisplayName("Advanced_Editor_Heading_Visual_Preview") }
                            </h5>
                            <p className = 'text-muted small'>
                                { localisationManager.getDisplayName("Advanced_Editor_Description_Visual_Preview") }
                            </p>
                        </div>
                    </div>
                    <div className = 'row mh-100 border-bottom flex-grow-1 overflow-hidden p-0'>
                        <div className = 'col-4 editors p-0 border-right overflow-auto os-host-flexbox mh-100 mw-100'>
                            <div className = 'container p-0'>
                                <div className = 'row m-0'>
                                    <div className = 'col p-0'>
                                        {/* <OverlayScrollbarsComponent
                                            options = { VisualConstants.dom.scrollbars }
                                        > */}
                                            <Accordion
                                                id = { VisualConstants.dom.advancedEditorAccordionIdSelector }
                                            >
                                                <AdvancedEditorArea
                                                    host = { this.props.host }
                                                    selectorIdSuffix = { VisualConstants.dom.stylesheetEditorIdSelectorSuffix }
                                                    heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Stylesheet') }
                                                    assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Stylesheet_Description') }
                                                    propertyName = 'stylesheet'
                                                    currentValue = { this.props.advancedEditing.stylesheet }
                                                    defaultValue = { VisualSettings.getDefault()['advancedEditing'].stylesheet }
                                                    advancedEditingObjectMetadata = { this.props.advancedEditingObjectMetadata }
                                                    eventKey = { 0 }
                                                    editorMode = 'css'
                                                    columns = { null }
                                                    localisationManager = { this.props.localisationManager }
                                                />
                                                <AdvancedEditorArea
                                                    host = { this.props.host }
                                                    selectorIdSuffix = { VisualConstants.dom.htmlBodyEditorIdSelectorSuffix }
                                                    heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Body') }
                                                    assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Body_Description') }
                                                    propertyName = 'body'
                                                    currentValue = { this.props.advancedEditing.body }
                                                    defaultValue = { VisualSettings.getDefault()['advancedEditing'].body }
                                                    advancedEditingObjectMetadata = { this.props.advancedEditingObjectMetadata }
                                                    eventKey = { 1 }
                                                    editorMode = 'html'
                                                    columns = { this.props.visualData.columns }
                                                    localisationManager = { this.props.localisationManager }
                                                />
                                                <AdvancedEditorArea
                                                    host = { this.props.host }
                                                    selectorIdSuffix = { VisualConstants.dom.htmlContentEditorIdSelectorSuffix }
                                                    heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Row') }
                                                    assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Row_Description') }
                                                    propertyName = 'row'
                                                    currentValue = { this.props.advancedEditing.row }
                                                    defaultValue = { VisualSettings.getDefault()['advancedEditing'].row }
                                                    advancedEditingObjectMetadata = { this.props.advancedEditingObjectMetadata }
                                                    eventKey = { 2 }
                                                    editorMode = 'html'
                                                    columns = { this.props.visualData.columns }
                                                    localisationManager = { this.props.localisationManager }
                                                />
                                            </Accordion>
                                        {/* </OverlayScrollbarsComponent> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col visual mh-100 mw-100 overflow-auto p-2'>
                            <OverlayScrollbarsComponent
                                options = { {} }
                            >
                                {/* <div className = 'container-fluid'>
                                    <div className = 'row'>
                                        <div className = 'col'> */}
                                            <VisualContent 
                                                visualData = { this.props.visualData }
                                                advancedEditing = { this.props.advancedEditing }
                                                contentFormatting = { this.props.contentFormatting }
                                                host = { this.props.host }
                                            />
                                        {/* </div>
                                    </div>
                                </div> */}
                            </OverlayScrollbarsComponent>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default AdvancedEditor;
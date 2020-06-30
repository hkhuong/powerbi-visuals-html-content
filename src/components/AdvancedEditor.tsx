// External dependencies
    import * as React from 'react';

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
            console.log('Editor re-render');
            const {
                localisationManager
            } = this.props;
            return (
                <div
                    className = 'container-fluid h-100 border'
                    id = 'advancedEditor'
                >
                    {/* Outer layout  */}
                    <div className = 'row border-bottom p-0'>
                        <div className = 'col-4 editors-heading border-right pl-1'>
                            <h5>
                                { localisationManager.getDisplayName("Advanced_Editor_Heading_Options") }
                            </h5>
                            <small className = 'text-muted'>
                                { localisationManager.getDisplayName("Advanced_Editor_Description_Options") }
                            </small>
                        </div>
                        <div className = 'col visual-heading pl-1'>
                            <h5>
                                { localisationManager.getDisplayName("Advanced_Editor_Heading_Visual_Preview") }
                            </h5>
                            <small className = 'text-muted'>
                                { localisationManager.getDisplayName("Advanced_Editor_Description_Visual_Preview") }
                            </small>
                        </div>
                    </div>
                    <div className = 'row h-100 border-bottom'>
                        <div className = 'col-4 editors p-0 border-right'>
                            <div className = 'container p-0'>
                                <div className = 'row m-0'>
                                    <div className = 'col p-0'>
                                        <div
                                            id = { VisualConstants.dom.advancedEditorAccordionIdSelector }
                                            className = 'accordion h-100'
                                        >
                                            <AdvancedEditorArea
                                                host = { this.props.host }
                                                selectorIdSuffix = { VisualConstants.dom.stylesheetEditorIdSelectorSuffix }
                                                heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Stylesheet') }
                                                assistiveText = { localisationManager.getDisplayName('Advanced_Editor_Heading_Stylesheet_Description') }
                                                expanded = { true }
                                                propertyName = 'stylesheet'
                                                currentValue = { this.props.advancedEditing.stylesheet }
                                                defaultValue = { VisualSettings.getDefault()['advancedEditing'].stylesheet }
                                            />
                                            <AdvancedEditorArea
                                                host = { this.props.host }
                                                selectorIdSuffix = { VisualConstants.dom.htmlBodyEditorIdSelectorSuffix }
                                                heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Body') }
                                                propertyName = 'body'
                                                currentValue = { this.props.advancedEditing.body }
                                                defaultValue = { VisualSettings.getDefault()['advancedEditing'].body }
                                            />
                                            <AdvancedEditorArea
                                                host = { this.props.host }
                                                selectorIdSuffix = { VisualConstants.dom.htmlContentEditorIdSelectorSuffix }
                                                heading = { localisationManager.getDisplayName('Advanced_Editor_Heading_Content') }
                                                propertyName = 'row'
                                                currentValue = { this.props.advancedEditing.row }
                                                defaultValue = { VisualSettings.getDefault()['advancedEditing'].row }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col visual'>
                            <div className = 'container p-2'>
                                <div className = 'row'>
                                    <div className = 'col'>
                                        <VisualContent 
                                            htmlContentEntries = { this.props.htmlContentEntries }
                                            usesHtmlContentDataRole = { this.props.usesHtmlContentDataRole }
                                        />
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default AdvancedEditor;
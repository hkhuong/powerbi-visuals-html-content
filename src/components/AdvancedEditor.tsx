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


    export class AdvancedEditor extends React.Component<IAdvancedEditorProps, {}> {

        render() {
            console.log('Editor re-render');
            return (
                <div className = 'container-fluid'>
                    {/* Outer layout  */}
                    <div className = 'row'>
                        <div className = 'col-4 editors'>
                            <div className = 'container p-0'>
                                <div className = 'row'>
                                    <div className = 'col'>
                                        <h4>Visual Stylesheet</h4>
                                        <textarea
                                            id = { VisualConstants.dom.stylesheetEditorIdSelector }
                                            className = 'w-100 form-control'
                                            value = { this.props.advancedEditing.stylesheet }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col visual'>
                            <h4>Visual</h4>
                            <VisualContent 
                                htmlContentEntries = { this.props.htmlContentEntries }
                                usesHtmlContentDataRole = { this.props.usesHtmlContentDataRole }
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default AdvancedEditor;
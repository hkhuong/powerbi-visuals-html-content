// Power BI dependencies
    import powerbi from 'powerbi-visuals-api';
    import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;

// External dependencies
    import * as React from 'react';
    import useRef = React.useRef;
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { 
        faChevronDown,
        faChevronUp
    } from '@fortawesome/free-solid-svg-icons';
    import AceEditor from 'react-ace';
    import 'ace-builds/src-noconflict/mode-html';
    import 'ace-builds/src-noconflict/mode-css';
    import 'ace-builds/src-noconflict/theme-chrome';
    import 'ace-builds/src-noconflict/ext-language_tools';
    import * as langTools from 'ace-builds/src-noconflict/ext-language_tools';
    import { addCompleter } from 'ace-builds/src-noconflict/ext-language_tools';

// Internal dependencies
    import {
        VisualConstants
    } from '../VisualConstants';
    import {
        IAdvancedEditorAreaProps,
        IAdvandedEditorAreaState
    } from '../interfaces';

    export class AdvancedEditorArea extends React.Component<IAdvancedEditorAreaProps, IAdvandedEditorAreaState> {

        private textAreaRef: React.RefObject<AceEditor>

        constructor(props: IAdvancedEditorAreaProps) {
            super(props);
            this.textAreaRef = React.createRef();
            this.state = {
                expanded: false
            }
            this.handleApplyClick = this.handleApplyClick.bind(this);
            this.handleResetClick = this.handleResetClick.bind(this);
            this.handleAccordionClick = this.handleAccordionClick.bind(this);
        }

        render() {
            const   headingId = `heading${ this.props.selectorIdSuffix }`,
                    collapseId = `collapse${ this.props.selectorIdSuffix }`,
                    textAreaId = `text${ this.props.selectorIdSuffix }`,
                    { expanded } = this.state;

            return(
                <div className = 'card p-0 rounded-0 border-top-0 border-left-0 border-right-0 border-bottom'>
                    <div
                        className ='card-header p-0'
                        id = { headingId }
                        onClick = { this.handleAccordionClick }
                    >
                        <button
                            className = 'btn btn-link btn-block text-left pl-2'
                            data-toggle = { 'collapse' }
                            data-target = { `#${ collapseId }` }
                            aria-expanded = { expanded }
                            aria-controls = { collapseId }
                        >
                            <FontAwesomeIcon 
                                icon = { expanded ? faChevronUp : faChevronDown }
                                size = 'lg'
                            /> &nbsp;
                            { this.props.heading }
                        </button>
                    </div>
                    <div
                        id = { collapseId }
                        className = { `${ expanded && 'collapse show' || 'collapse' }` }
                        aria-labelledby = { headingId }
                        data-parent = { `#${ VisualConstants.dom.advancedEditorAccordionIdSelector }` }
                    >
                        <div className = 'card-body pl-3 pt-1 border-top'>
                            <p className = 'text-muted editor-assistive-text small'>
                                { this.props.assistiveText }
                            </p>
                            <p>
                                <div className = 'text-right'>
                                    <button
                                        type = 'button'
                                        className = 'btn btn-sm btn-primary mr-1'
                                        onClick = { this.handleApplyClick }
                                    >
                                            Apply
                                    </button>

                                    <button
                                        className = 'btn btn-link'
                                        onClick = { this.handleResetClick }
                                    >
                                            Reset
                                    </button>
                                </div>
                            </p>
                            <p>
                                <AceEditor
                                    className = 'w-100'
                                    mode = { this.props.editorMode }
                                    theme = 'chrome'
                                    defaultValue = { this.props.currentValue }
                                    name = { textAreaId }
                                    ref = { this.textAreaRef }
                                    setOptions = {{
                                        tabSize: 2,
                                        useWorker: false,
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                    }}
                                />
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

            componentDidUpdate() {
                this.updateAutoCompletion();            
            }

            private handleAccordionClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
                e.preventDefault();
                this.setState({
                    expanded: !this.state.expanded
                });
            }

        /**
         * Resets the text area content back to the default, and sets property in the visual.
         *
         * @param e - Click event
         */
            private handleApplyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                const
                    defaultValue = this.textAreaRef.current.editor.getValue(),
                    changes = this.getNewObjectInstance();
                changes.replace[0].properties[this.props.propertyName] = defaultValue;
                this.props.host.persistProperties(changes);
            };

        /**
         * Resets the text area content back to the default, and sets property in the visual.
         *
         * @param e - Click event
         */
            private handleResetClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                const
                    defaultValue = this.props.defaultValue,
                    changes = this.getNewObjectInstance();
                changes.replace[0].properties[this.props.propertyName] = defaultValue;
                this.textAreaRef.current.editor.setValue(defaultValue);
                this.props.host.persistProperties(changes);
            };

        /**
         * Gets an empty metadata object so that we can populate it with a value from the text box, or reset it.
         */
            private getNewObjectInstance(): VisualObjectInstancesToPersist {
                return {
                    replace: [
                        {
                            objectName: 'advancedEditing',
                            selector: null,
                            properties: this.props.advancedEditingObjectMetadata || {}
                        }
                    ]
                };
            }

        /**
         * Manage the autocompletion in each editor, based on what role it's performing.
         */
            private updateAutoCompletion() {
                // This is messy, but will remove the custom completer if it's already been added
                    if (this.textAreaRef.current.editor.completers.length > 3) {
                        this.textAreaRef.current.editor.completers.pop();
                    }
                    let tokens = [];

                    switch (this.props.propertyName) {
                        case 'body': {
                            tokens.push({
                                name: `${VisualConstants.advancedEditing.body.dataSetToken}`,
                                value: `${VisualConstants.advancedEditing.body.dataSetToken}`,
                                caption: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Dataset'),
                                meta: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Metadata_Dataset')
                            });
                            break;
                        }
                        case 'row': {
                            tokens = this.props.columns.map((dr, dri) => ({
                                            name: `{{${dr.name}}}`,
                                            value: `{{${dr.name}}}`,
                                            caption: `${dr.name}`,
                                            meta: `${dr.isMeasure 
                                                    ?   this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Measure')
                                                    :   this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Column')
                                                }`,
                                            score: dri
                                        })
                                    );
                            tokens.push({
                                name: `${VisualConstants.advancedEditing.row.dataRowToken}`,
                                value: `${VisualConstants.advancedEditing.row.dataRowToken}`,
                                caption: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Row'),
                                meta: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Metadata_Row')
                            });
                            break;
                        }
                    }
                    addCompleter({
                        getCompletions: (editor, session, pos, prefix, callback) => {
                            callback(null, tokens);
                        }
                    });
            }

    }

    export default AdvancedEditorArea;
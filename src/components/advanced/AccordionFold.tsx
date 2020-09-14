// Power BI API dependencies
    import powerbi from 'powerbi-visuals-api';
    import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;
// External dependencies
    import * as React from 'react';
    import { Ace } from 'ace-builds';
    import { CgChevronDown, CgChevronUp } from 'react-icons/cg';
    import AceEditor from 'react-ace';
    import 'ace-builds/src-noconflict/mode-html';
    import 'ace-builds/src-noconflict/mode-css';
    import 'ace-builds/src-noconflict/theme-chrome';
    import 'ace-builds/src-noconflict/ext-language_tools';
    import * as langTools from 'ace-builds/src-noconflict/ext-language_tools';
// Internal dependencies
    import { AccordionFoldProps, AccordionFoldState } from '../../defs/advanced';
    import { VisualConstants } from '../../VisualConstants';

/**
 * Individual menu (accordion) component of the advanced editor sidebar
 */
    export default class AccordionFold extends React.Component<AccordionFoldProps, AccordionFoldState> {

        // The text editor in this component instance
            private editorRef: React.RefObject<AceEditor>;

            constructor(props: AccordionFoldProps) {
                super(props);
                this.state = {
                    expanded: false
                };
                this.editorRef = React.createRef();
                this.handleAccordionClick = this.handleAccordionClick.bind(this);
                this.handleApplyClick = this.handleApplyClick.bind(this);
                this.handleResetClick = this.handleResetClick.bind(this);
            }

            render() {
                const
                    {
                        currentValue,
                        editorMode,
                        localisationManager,
                        editorOptions
                    } = this.props,
                    {
                        expanded
                    } = this.state,
                    textAreaId = `text${ this.props.selectorIdSuffix }`;
                return (
                    <div className = { `accordion-heading w3-border-bottom` }>
                        <button
                            className = { `w3-button w3-left-align w3-block accordion-button ` }
                            onClick = { this.handleAccordionClick }
                        >

                            { this.resolveIcon() } &nbsp;
                            { this.props.heading }
                        </button>
                        <div
                            className = { `accordion-fold-content w3-container w3-border-top w3-${expanded && 'show' || 'hide'}` }
                        >
                            <p className = 'text-muted assistive small'>
                                { this.props.assistiveText }
                            </p>
                            <p>
                                <div>
                                    <AceEditor
                                        mode = { editorMode }
                                        theme = 'chrome'
                                        defaultValue = { currentValue }
                                        name = { textAreaId }
                                        ref = { this.editorRef }
                                        width = '100%'
                                        minLines = { 5 }
                                        maxLines = { 20 }
                                        setOptions = {{
                                            tabSize: editorOptions.tabSize,
                                            useWorker: false,
                                            enableLiveAutocompletion: true,
                                            enableBasicAutocompletion: true,
                                            wrap: editorOptions.wrap
                                        }}
                                    />
                                </div>
                            </p>
                            <p>
                                <div className = 'w3-right-align'>
                                    <button
                                        className = 'w3-button w3-small primary'
                                        type = 'button'
                                        onClick = { this.handleApplyClick }
                                    >
                                            { localisationManager.getDisplayName('Button_Apply') }
                                    </button>
                                    <button
                                        className = 'w3-button w3-small w3-border-0 w3-hover-none'
                                        onClick = { this.handleResetClick }
                                    >
                                            { localisationManager.getDisplayName('Button_Reset') }
                                    </button>
                                </div>
                            </p>
                        </div>
                    </div>
                )
            }

            componentDidUpdate() {
                this.editorRef.current.editor.resize(true);
                this.editorRef.current.editor.completers = this.getAutoCompleter();
            }

            componentDidMount() {
                this.editorRef.current.editor.completers = this.getAutoCompleter();
            }

        /**
         * Ensure that toggle state is managed when the header is clicked
         *
         * @param e - mouse event
         */
            private handleAccordionClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
                e.preventDefault();
                this.setState({
                    expanded: !this.state.expanded
                });
            }

        /**
         * Ensure that the correct state icon is displayed, depending on whether menu is open or closed
         */
            resolveIcon() {
                return this.state.expanded &&
                    <CgChevronUp className = 'visual-icon accordion-chevron'/> ||
                    <CgChevronDown className = 'visual-icon accordion-chevron'/>;
            }
        
        /**
         * Resets the text area content back to the default, and sets property in the visual.
         *
         * @param e - Click event
         */
            private handleApplyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                const
                    defaultValue = this.editorRef.current.editor.getValue(),
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
                this.editorRef.current.editor.setValue(defaultValue);
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
         * Manage completer for HTML row template. Will enumerate measures and columns in the content role and provide tokenisation
         * for them for the end-user
         */
            private getRowCompleter(): Ace.Completer {
                let tokens = [];
                // Tokens for columns and measures
                    this.props.columns.forEach((dr, dri) => {
                        tokens.push({
                            name: `{{${dr.name}}}`,
                            value: `{{${dr.name}}}`,
                            caption: `{{${dr.name}}}`,
                            meta: `${dr.isMeasure 
                                    ?   this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Measure')
                                    :   this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Column')
                                }`,
                            score: dri
                        })
                    });
                // Token for entire row
                    tokens.push({
                        name: `${VisualConstants.advancedEditing.row.dataRowToken}`,
                        value: `${VisualConstants.advancedEditing.row.dataRowToken}`,
                        caption: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Row'),
                        meta: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Metadata_Row')
                    });
                return {
                    getCompletions: (editor, session, pos, prefix, callback) => {
                        callback(null, tokens)
                    }
                }
            }

        /**
         * Manage completer for the HTML body template
         */
            private getBodyCompleter(): Ace.Completer {
                return {
                    getCompletions: (editor, session, pos, prefix, callback) => {
                        callback(null, [
                            {
                                name: `${VisualConstants.advancedEditing.body.dataSetToken}`,
                                value: `${VisualConstants.advancedEditing.body.dataSetToken}`,
                                caption: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Caption_Dataset'),
                                meta: this.props.localisationManager.getDisplayName('Advanced_Editor_Completer_Metadata_Dataset'),
                                score: 0
                            }
                        ])
                    }
                }
            }

        /**
         * Autocompletion appears to be global to all editors in the page, so this manage the autocompletion in each editor,
         * based on what role it's performing.
         */
            private getAutoCompleter(): Ace.Completer[] {
                let completers = this.editorRef.current.editor.completers;
                // This is messy, but will remove the custom completer if it's already been added
                    if (completers.length > 3) {
                        completers.pop();
                    }
                switch (this.props.propertyName) {
                    case 'body': {
                        return completers.concat([this.getBodyCompleter()]);
                    }
                    case 'row': {
                        return completers.concat([this.getRowCompleter()]);
                    }
                    default: {
                        return completers.concat([]);
                    }
                }
               
            }            

    }
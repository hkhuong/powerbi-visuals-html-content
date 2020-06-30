// External dependencies
    import * as React from 'react';

// Internal dependencies
    import {
        VisualConstants
    } from '../VisualConstants';
    import {
        IAdvancedEditorAreaProps, IAdvancedEditorProps
    } from '../interfaces';
import powerbi from 'powerbi-visuals-api';

    export class AdvancedEditorArea extends React.Component<IAdvancedEditorAreaProps, {}> {

        private textAreaRef: React.RefObject<HTMLTextAreaElement>

        constructor(props: IAdvancedEditorAreaProps) {
            super(props);
            this.handleResetClick = this.handleResetClick.bind(this);
            this.textAreaRef = React.createRef();
        }

        render() {
            const   headingId = `heading${ this.props.selectorIdSuffix }`,
                    collapseId = `collapse${ this.props.selectorIdSuffix }`,
                    textAreaId = `text${ this.props.selectorIdSuffix }`;
            return(
                <div className = 'card p-0 rounded-0 border-top-0 border-left-0 border-right-0 border-bottom'>
                    <div
                        className ='card-header p-0'
                        id = { headingId }
                    >
                        <div
                            className = 'btn-toolbar justify-content-between'
                            role = 'toolbar'
                            aria-label = 'Advanced editor component options'
                        >
                            <button
                                className = 'btn btn-link btn-block text-left pl-2'
                                data-toggle = { 'collapse' }
                                data-target = { `#${ collapseId }` }
                                aria-expanded = { this.props.expanded }
                                aria-controls = { collapseId }
                            >
                                { this.props.heading }
                            </button>
                        </div>
                    </div>
                    <div
                        id = { collapseId }
                        className = { `collapse ${this.props.expanded && 'show' || '' }` }
                        aria-labelledby = { headingId }
                        data-parent = { `#${ VisualConstants.dom.advancedEditorAccordionIdSelector }` }
                    >
                        <div className = 'card-body pl-3 pt-1 border-top'>
                            <small className = 'text-muted editor-assistive-text'>
                                { this.props.assistiveText }
                            </small>
                            <p>
                                <textarea
                                    id = { textAreaId }
                                    className = 'w-100 form-control editor-code'
                                    defaultValue = { this.props.currentValue }
                                    rows = { 10 }
                                    ref = { this.textAreaRef }
                                />
                            </p>
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
                            
                        </div>
                    </div>
                </div>
            );
        }

        /**
         * Resets the text area content back to the default, and sets property in the visual.
         *
         * @param e - Click event
         */
            handleApplyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                const
                    defaultValue = this.textAreaRef.current.value,
                    changes = this.getNewObjectInstance();
                changes.replace[0].properties[this.props.propertyName] = defaultValue;
                this.props.host.persistProperties(changes);
            };

        /**
         * Resets the text area content back to the default, and sets property in the visual.
         *
         * @param e - Click event
         */
            handleResetClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                const
                    defaultValue = this.props.defaultValue,
                    changes = this.getNewObjectInstance();
                changes.replace[0].properties[this.props.propertyName] = defaultValue;
                this.textAreaRef.current.value = defaultValue;
                this.props.host.persistProperties(changes);
            };

        /**
         * Gets an empty metadata object so that we can populate it with a value from the text box, or reset it.
         */
            private getNewObjectInstance(): powerbi.VisualObjectInstancesToPersist {
                return {
                    replace: [
                        {
                            objectName: 'advancedEditing',
                            selector: null,
                            properties: {}
                        }
                    ]
                };
            }

    }

    export default AdvancedEditorArea;
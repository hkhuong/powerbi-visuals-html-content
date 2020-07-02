// Power BI dependencies
    import powerbi from 'powerbi-visuals-api';
    import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;

// External dependencies
    import * as React from 'react';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { 
        faChevronDown,
        faChevronUp
    } from '@fortawesome/free-solid-svg-icons';
    import {
        Accordion
    } from 'react-bootstrap';

// Internal dependencies
    import {
        VisualConstants
    } from '../VisualConstants';
    import {
        IAdvancedEditorAreaProps,
        IAdvandedEditorAreaState
    } from '../interfaces';

    export class AdvancedEditorArea extends React.Component<IAdvancedEditorAreaProps, IAdvandedEditorAreaState> {

        private textAreaRef: React.RefObject<HTMLTextAreaElement>

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
            private handleResetClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

    }

    export default AdvancedEditorArea;
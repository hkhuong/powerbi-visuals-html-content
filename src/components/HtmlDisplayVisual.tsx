// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

// Internal dependencies
    import {
        VisualConstants
    } from '../VisualConstants';
    import {
        IHtmlDisplayVisualProps,
        IHtmlDisplayVisualState
    } from '../interfaces';
    import DataUtils from '../DataUtils';
    import LandingPage from './LandingPage';
    import AdvancedEditor from './AdvancedEditor';
    import VisualContent from './VisualContent';

    const initialState: IHtmlDisplayVisualState = {
        data: DataUtils.getProcessedDataView([]),
        isEditMode: false,
        canAdvancedEdit: false
    }

    export class HtmlDisplayVisual extends React.Component<IHtmlDisplayVisualProps, IHtmlDisplayVisualState> {

        constructor(props: IHtmlDisplayVisualProps) {
            super(props);
            this.state = initialState;
        }

        render() {
            const {
                isEditMode,
                canAdvancedEdit,
                updateOptions,
                advancedEditing,
                objectMetadata,
                data
            } = this.state;
            switch (true) {
                case !data.isDataViewValid: {
                    return (
                        <LandingPage
                            host = { this.props.host }
                            localisationManager = { this.props.localisationManager } 
                        />
                    );
                }
                case isEditMode: {
                    return (
                        <AdvancedEditor
                            host = { this.props.host }
                            localisationManager = { this.props.localisationManager }
                            advancedEditing = { advancedEditing }
                            visualData = { data.visualData }
                            advancedEditingObjectMetadata = { objectMetadata?.advancedEditing }
                        />
                    );
                }
                case data.isDataViewValid: {
                    return (
                    <OverlayScrollbarsComponent
                        options = { VisualConstants.dom.scrollbars }
                    >
                        <VisualContent
                            visualData = { data.visualData }
                            advancedEditing = { advancedEditing }
                        />
                    </OverlayScrollbarsComponent>
                    )
                }
            }

            return (
                <div>
                    <ul>
                        <li>Is Edit Mode: { `${isEditMode}` }</li>
                        <li>Can Advanced Edit: { `${canAdvancedEdit}` }</li>
                        <li>Viewport: <code>{ JSON.stringify(updateOptions?.viewport, null, 4) }</code></li>
                        <li>Data: <code>{ `${ JSON.stringify(data, null, 4) }` }</code></li>
                    </ul>
                </div>
            );
        }

        private static updateCallback: (data: object) => void = null;

        public static update(newState: Partial<IHtmlDisplayVisualState>) {
            if(typeof HtmlDisplayVisual.updateCallback === 'function'){
                HtmlDisplayVisual.updateCallback(newState);
            }
        }

        public componentWillMount() {
            HtmlDisplayVisual.updateCallback = (newState: IHtmlDisplayVisualState): void => this.setState(newState);
        }
    
        public componentWillUnmount() {
            HtmlDisplayVisual.updateCallback = null;
        }

    }

    export default HtmlDisplayVisual;
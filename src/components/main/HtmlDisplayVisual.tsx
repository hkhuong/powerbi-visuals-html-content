// External dependencies
    import * as React from 'react';
// Internal dependencies
    import {
        VisualSettings
    } from '../../VisualSettings';
    import {
        IHtmlDisplayVisualProps,
        IHtmlDisplayVisualState
    } from '../../defs/main';
    import getProcessedDataView  from '../../utils/getProcessedDataView';
    import LandingPage from '../landing/LandingPage';
    import AdvancedEditor from '../advanced/AdvancedEditor';
    import StandardDisplay from '../standard/StandardDisplay';

// Ensure that if visual settings haven't been parsed, then we fill with defaults
    const defaultSettings = VisualSettings.getDefault();
// Initial component state
    const initialState: IHtmlDisplayVisualState = {
        data: getProcessedDataView([]),
        isEditMode: false,
        canAdvancedEdit: false,
        editorOptions: defaultSettings['editorOptions'],
        advancedEditing: defaultSettings['advancedEditing'],
        contentFormatting: defaultSettings['contentFormatting']
    }

/**
 * Main visual UI component; driven from visual workflow
 */
    export default class HtmlDisplayVisual extends React.Component<IHtmlDisplayVisualProps, IHtmlDisplayVisualState> {

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
                contentFormatting,
                objectMetadata,
                data,
                editorOptions
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
                            contentFormatting = { contentFormatting }
                            visualData = { data.visualData }
                            advancedEditingObjectMetadata = { objectMetadata?.advancedEditing }
                            editorOptions = { editorOptions }
                        />
                    );
                }
                case data.isDataViewValid: {
                    return (
                        <StandardDisplay
                            visualData = { data.visualData }
                            advancedEditing = { advancedEditing }
                            contentFormatting = { contentFormatting }
                            host = { this.props.host }
                        />
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

        public static UPDATE(newState: Partial<IHtmlDisplayVisualState>) {
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
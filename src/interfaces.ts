// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
    import DataViewObjects = powerbi.DataViewObjects;
    import DataViewObject = powerbi.DataViewObject;

// Internal dependencies
    import {
        AdvancedEditingSettings,
        ContentFormattingSettings
    } from './VisualSettings';

/**
 * Necessary properties to render the visual as a React component.
 */
    export interface IHtmlDisplayVisualProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
    }

/**
 * The visual view model, managed via React state.
 */
    export interface IHtmlDisplayVisualState {
        // Options supplied from visual update methos
            updateOptions?: VisualUpdateOptions;
        // Confirms that the visual is open in Power BI's edit mode rather than viewing
            isEditMode: boolean;
        // Confirms that we can display advanced edit options
            canAdvancedEdit: boolean;
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing?: AdvancedEditingSettings;
        // Visual's content editing properties from the data view (or defaults)
            contentFormatting?: ContentFormattingSettings;
        // Object metadata, used for checking/persisting
            objectMetadata?: DataViewObjects;
        // Visual data (mapped from data view)
            data: IVisualData;
    }

/**
 * The data component and flags required for the visual view model.
 */
    export interface IVisualData {
        // Confirms the supplied data view is valid
            isDataViewValid: boolean;
        // Confirms that there actually data supplied from the visual once mapped
            hasData: boolean;
        // The index of the HTML Content data role from the data view metadata
        // (used to ensure that we render the correct column for this use case)
            contentDataRoleIndex: number;
        // Flag confirming we should be using the HTML Content role for our rendering
            usesHtmlContentDataRole: boolean;
        // The index of the Values data role from the data view metadata
        // (we just need to know one exists to switch our workflow)
            valuesDataRoleIndex: number;
        // Flag confirming we should be using the Values role for our rendering
            usesValuesDataRole: boolean;
        // Array of our HTML content raw values
            htmlContentEntries: string[];
    }

/**
 * React component props used to manage the visual landing page.
 */
    export interface ILandingPageProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
    }

    export interface IAdvancedEditorProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
        // Object metadata, used for checking/persisting
            advancedEditingObjectMetadata?: DataViewObject;
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing?: AdvancedEditingSettings;
        // Array of our HTML content raw values
            htmlContentEntries: string[];
        // Flag confirming we should be using the HTML Content role for our rendering
            usesHtmlContentDataRole: boolean;
    }

    export interface IAdvancedEditorState {

    }

    export interface IVisualContentProps {
        // Array of our HTML content raw values
            htmlContentEntries: string[];
        // Flag confirming we should be using the HTML Content role for our rendering
            usesHtmlContentDataRole: boolean;
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing?: AdvancedEditingSettings;
    }

    export interface IAdvancedEditorAreaProps {
        // Power BI visual host services
            host: IVisualHost;
        // Object metadata, used for checking/persisting
            advancedEditingObjectMetadata?: DataViewObject;
        selectorIdSuffix: string;
        heading: string;
        assistiveText?: string;
        propertyName: string;
        currentValue: string;
        defaultValue: string;
        eventKey: number;
    }

    export interface IAdvandedEditorAreaState {
        // Whether section is expanded or not
            expanded: boolean;
    }
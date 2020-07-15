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
            data: IVisualValueData;
    }

/**
 * The data component and flags required for the visual view model.
 */
    export interface IVisualValueData {
        // Confirms the supplied data view is valid
            isDataViewValid: boolean;
        // Confirms that there are actually data supplied from the visual once mapped
            hasData: boolean;
        // The index of the HTML Content data role from the data view metadata
        // (used to ensure that we render the correct column for this use case)
            valuesDataRoleIndex: number;
        // Array of our values data role fields/measures
            visualData: IVisualData;
    }

    export interface IVisualData {
        columns: ITableColumn[],
        values?: IVisualValues[]
    }

    export interface ITableColumn {
        name: string;
        index: number;
        format?: string;
        isMeasure: boolean;
    }

    export interface IVisualValues {
        [key: string]: any;
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
        // Derived visual data
            visualData: IVisualData;
    }

    export interface IAdvancedEditorState {

    }

    export interface IVisualContentProps {
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing?: AdvancedEditingSettings;
        // Derived visual data
            visualData: IVisualData;
    }

    export interface IAdvancedEditorAreaProps {
        // Power BI visual host services
            host: IVisualHost;
        // Object metadata, used for checking/persisting
            advancedEditingObjectMetadata?: DataViewObject;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
        selectorIdSuffix: string;
        heading: string;
        assistiveText?: string;
        propertyName: string;
        currentValue: string;
        defaultValue: string;
        eventKey: number;
        editorMode: string;
        columns: ITableColumn[];
    }

    export interface IAdvandedEditorAreaState {
        // Whether section is expanded or not
            expanded: boolean;
    }
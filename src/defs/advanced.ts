// Power BI API Dependencies
import powerbi from 'powerbi-visuals-api';
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
import DataViewObject = powerbi.DataViewObject;

import { IVisualContentProps, ITableColumn, IVisualData } from '../interfaces';
import {
    AdvancedEditingSettings,
    ContentFormattingSettings,
    EditorOptionsSettings
} from '../VisualSettings';

    export interface AdvancedEditorProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
        // Object metadata, used for checking/persisting
            advancedEditingObjectMetadata?: DataViewObject;
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing: AdvancedEditingSettings;
        // Visual's content editing properties from the data view (or defaults)
            contentFormatting: ContentFormattingSettings;
        // Derived visual data
            visualData: IVisualData;
        // Editor options
            editorOptions?: EditorOptionsSettings;
    }

    export interface EditorHeaderProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
    }

    export interface EditorSidebarProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing: AdvancedEditingSettings;
        // Object metadata, used for checking/persisting
            advancedEditingObjectMetadata?: DataViewObject;
        // Derived visual data
            visualData: IVisualData;
        // Editor options
            editorOptions: EditorOptionsSettings;
    }

    export interface EditorVisualPreviewProps extends IVisualContentProps {
        // Localisation manager instance
            localisationManager: ILocalizationManager;
    }

    export interface AccordionFoldProps {
        // Power BI visual host services
            host: IVisualHost;
        // Object metadata, used for checking/persisting
            advancedEditingObjectMetadata?: DataViewObject;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
        // Editor options
            editorOptions: EditorOptionsSettings;
        // Selector suffix to apply to editor (for its unique ID)
            selectorIdSuffix: string;
        // Menu heading
            heading: string;
        // Assistive text to display in expanded section
            assistiveText?: string;
        // Property used to store configuration
            propertyName: string;
        // The current value, according to visual properties
            currentValue: string;
        // The default to display if the user reverts or the property value is missing
            defaultValue: string;
        // Ace editor mode to apply to editor instance
            editorMode: string;
        // dataView columns (used for auto-completion)
            columns: ITableColumn[];
    }

    export interface AccordionFoldState {
        // Whether section is expanded or not
            expanded: boolean;
    }
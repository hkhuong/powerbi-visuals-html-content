// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
// Internal dependencies
    import {
        AdvancedEditingSettings,
        ContentFormattingSettings
    } from '../VisualSettings';
    import { IVisualData } from './main';

/**
 * Manages the main visual display
 */
    export interface VisualContentProps {
        // Visual's advanced editing properties from the data view (or defaults)
            advancedEditing: AdvancedEditingSettings;
        // Visual's content editing properties from the data view (or defaults)
            contentFormatting: ContentFormattingSettings;
        // Derived visual data
            visualData: IVisualData;
        // Power BI visual host services
            host: IVisualHost;
    }
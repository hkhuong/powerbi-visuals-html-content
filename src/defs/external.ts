// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;

/**
 * Used to manage an icon that refers a user to an external URL
 */
    export interface ClickableIconExternalLinkProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
    }
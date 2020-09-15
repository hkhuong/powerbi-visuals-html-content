// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;

/**
 * Manages the visual landing page.
 */
    export interface LandingPageProps {
        // Power BI visual host services
            host: IVisualHost;
        // Localisation manager instance
            localisationManager: ILocalizationManager;
    }
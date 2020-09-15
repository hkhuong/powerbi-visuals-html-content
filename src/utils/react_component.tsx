// Power BI API dependencies
    import powerbi from 'powerbi-visuals-api';
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
// External dependencies
    import * as React from 'react';
// Internal dependencies
    import { VisualConstants } from '../VisualConstants';

/**
 * Displays 'not for production' message if dev flag enabled.
 */
    export function resolveDevMessage() {
        return (VisualConstants.preProduction || VisualConstants.devMode) && 
            (
                <span className = 'not-for-production'>
                    &nbsp;{ 'PRE-RELEASE BUILD' }
                </span>
            ) || null;
    }

/**
 * Ensure that any URLs are delegated to Power BI for opening.
 *
 * @param e - Click event
 */
    export function handleUiIconExternal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, host: IVisualHost) {
        e.preventDefault();
        host.launchUrl(e.currentTarget.href);
    }
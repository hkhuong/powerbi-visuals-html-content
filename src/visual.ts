// Power BI API Dependencies
    import 'core-js/stable';
    import './../style/visual.less';
    import powerbi from 'powerbi-visuals-api';
    import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
    import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
    import IVisual = powerbi.extensibility.visual.IVisual;
    import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
    import VisualObjectInstance = powerbi.VisualObjectInstance;
    import DataView = powerbi.DataView;
    import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import IVisualEventService = powerbi.extensibility.IVisualEventService;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
    import ViewMode = powerbi.ViewMode;
    import EditMode = powerbi.EditMode;

// External dependencies
    import * as d3Select from 'd3-selection';
    import * as React from 'react';
    import * as ReactDOM from 'react-dom';

// Internal Dependencies
    import HtmlDisplayVisual from './components/HtmlDisplayVisual';
    import {
        VisualSettings
    } from './VisualSettings';
    import {
        VisualConstants
    } from './VisualConstants';
    import DomainUtils from './DomainUtils';
    import DataUtils from './DataUtils';

    export class Visual implements IVisual {

        // React app container
            private reactRoot: React.ComponentElement<any, any>;
        // The root element for the entire visual
            private container: HTMLElement;
        // Visual host services
            private host: IVisualHost;
        // Parsed visual settings
            private settings: VisualSettings;
        // Handle rendering events
            private events: IVisualEventService;
        // Handle localisation of visual text
            private localisationManager: ILocalizationManager;
        // Manages custom styling from the user
            private styleSheetContainer: d3Select.Selection<HTMLStyleElement, any, any, any>;

        // Runs when the visual is initialised
            constructor(options: VisualConstructorOptions) {
                this.container = options.element;
                this.host = options.host;
                this.localisationManager = this.host.createLocalizationManager();
                this.events = this.host.eventService;
                this.reactRoot = React.createElement(HtmlDisplayVisual, {
                    host: this.host,
                    localisationManager: this.localisationManager
                });
                ReactDOM.render(this.reactRoot, this.container);
                this.styleSheetContainer = d3Select.select('head')
                    .append('style')
                        .attr('id', VisualConstants.dom.stylesheetIdSelector)
                        .attr('name', VisualConstants.dom.stylesheetIdSelector);
                
            }

        // Runs when data roles added or something changes
            public update(options: VisualUpdateOptions) {

                // Handle main update flow
                    try {

                        // Signal we've begun rendering
                            this.events.renderingStarted(options);
                            // this.updateStatus();

                        // Parse the settings for use in the visual
                            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);

                        // Update our component with new data
                            let state = {
                                updateOptions: options,
                                canAdvancedEdit: options.viewMode === ViewMode.Edit && !options.isInFocus,
                                isEditMode: options.viewMode === ViewMode.Edit && options.editMode === EditMode.Advanced && options.isInFocus,
                                contentFormatting: this.settings.contentFormatting,
                                advancedEditing: this.settings.advancedEditing,
                                data: DataUtils.getProcessedDataView(options.dataViews)
                            };
                            HtmlDisplayVisual.update(state);

                        // Render our content
                            state.advancedEditing.enabled && DomainUtils.resolveUserStylesheet(this.styleSheetContainer, state.advancedEditing.stylesheet);
                            // let dataElements = DomainUtils.bindVisualDataToDom(
                            //         this.contentContainer,
                            //         viewModel.htmlEntries
                            //     );
                            // DomainUtils.resolveHtmlGroupElement(dataElements, viewModel.contentFormatting.showRawHtml);
                            // DomainUtils.resolveGroupSeparation(viewModel.contentFormatting.separation, dataElements);
                            // DomainUtils.resolveBodyStyling(this.container, {
                            //     fontFamily: viewModel.contentFormatting.fontFamily,
                            //     fontSize: viewModel.contentFormatting.fontSize,
                            //     colour: viewModel.contentFormatting.fontColour,
                            //     textAlign: viewModel.contentFormatting.align
                            // });
                            // DomainUtils.resolveHyperlinkHandling(this.host, this.container, viewModel.contentFormatting.hyperlinks);
                            // DomainUtils.resolveContextMenu(this.container, this.host.createSelectionManager());
                            // DomainUtils.resolveScrollableContent(this.container);
                            // state.advancedEditing.enabled && DomainUtils.resolveUserScript(state.advancedEditing.script);

                        // Signal that we've finished rendering
                            this.events.renderingFinished(options);
                            return;

                    } catch(e) {

                        // Signal that we've encountered an error
                            this.events.renderingFailed(options, e);
                            // this.contentContainer.selectAll('*').remove();
                            this.updateStatus();
                            // DomainUtils.resolveScrollableContent(this.container.node());

                    }

            }

        /**
         * Generic function to manage update of text within status container.
         * 
         * @param message   - Simple message to display. Omit to remove current content.
         */
            private updateStatus(message?: string) {
                // this.statusContainer.html(message);
            }

            private static parseSettings(dataView: DataView): VisualSettings {
                return VisualSettings.parse(dataView);
            }

        /**
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         *
         */
            public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
                const instances: VisualObjectInstance[] = (
                        <VisualObjectInstanceEnumerationObject>VisualSettings.enumerateObjectInstances(
                            this.settings || VisualSettings.getDefault(),
                            options
                        )
                    ).instances;
                let objectName = options.objectName;

                switch (objectName) {
                    case 'contentFormatting': {
                        if (this.settings.contentFormatting.showRawHtml) {
                            delete instances[0].properties['fontFamily'];
                        }
                        break;
                    }
                }
                return instances;
            }
    }       
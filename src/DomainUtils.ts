// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import ISelectionManager = powerbi.extensibility.ISelectionManager;
// External dependencies
    import * as d3Select from 'd3-selection';
    import * as less from 'less';
// Internal dependencies
    import { VisualConstants } from './VisualConstants';

    export namespace DomainUtils {

        /**
         * Compile user-supplied CSS and add to the visual's DOM with an appropriate "namespace",
         * so as to not interfere with any of our internal elements
         *
         * @param stylesheetContainer   - style element to apply/update
         * @param css                   - CSS content to compile
         */
            export function resolveUserStylesheet(
                stylesheetContainer: d3Select.Selection<HTMLStyleElement, any, any, any>,
                css: string
            ) {
                let styles = `#${VisualConstants.dom.htmlOutputIdSelector} {
                        {{css}}
                    }`.replace('{{css}}', css);
                less.render(styles, (err, out) => {
                    stylesheetContainer.text(out.css);
                });                
            }

        /**
         * Potentially allow scripting for the user; currently not being called
         * @param script 
         */
            export function resolveUserScript(
                // scriptContainer: d3.Selection<HTMLScriptElement, any, any, any>,
                script: string
            ) {
                d3Select.select(`#${VisualConstants.dom.scriptIdSelector}`)
                    .remove();
                let scriptContainer =  d3Select.select('body')
                    .append('script')
                        .attr('id', VisualConstants.dom.scriptIdSelector)
                        .attr('name', VisualConstants.dom.scriptIdSelector);
                scriptContainer.text(script);
            }

        /**
         * For the specified element, process all hyperlinks so that they are either explicitly denied,
         * or delegated to the Power BI visual host for permission to open.
         * 
         * @param host              - The Power BI visual host services object.
         * @param container         - The container to process.
         * @param allowDelegation   - Allow hyperlinks to be delegated to Power BI.
         */
            export function resolveHyperlinkHandling(
                host: IVisualHost,
                container: HTMLElement,
                allowDelegation?: boolean
            ) {
                d3Select.select(container)
                    .selectAll('a')
                        .on('click', (d, i, e) => {
                            d3Select.event.preventDefault();
                            allowDelegation && host.launchUrl(
                                    d3Select.select(e[i])
                                        .attr('href')
                                );
                        });
            }

        /**
         * Add Power BI context menu suppor to the selected container
         *
         * @param container         - The container to process.
         * @param selectionManager  - Power BI host services selection manager instance.
         */
            export function resolveContextMenu(
                container: HTMLElement,
                selectionManager: ISelectionManager
            ) {
                d3Select.select(container).on('contextmenu', () => {
                    const mouseEvent: MouseEvent = <MouseEvent>d3Select.event;
                    selectionManager.showContextMenu({}, {
                        x: mouseEvent.x,
                        y: mouseEvent.y
                    });
                    mouseEvent.preventDefault();
                })

            }

    }

    export default DomainUtils;
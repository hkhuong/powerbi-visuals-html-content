// Power BI dependencies
    import { valueFormatter } from 'powerbi-visuals-utils-formattingutils';

// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
    import { TextAlignProperty } from 'csstype'

// Internal dependencies
    import {
        IVisualContentProps
    } from '../interfaces';
    import { VisualConstants } from '../VisualConstants';

    export class VisualContent extends React.Component<IVisualContentProps, {}> {

        

        render() {

            const {
                contentFormatting
            } = this.props;

            if (contentFormatting?.showRawHtml) {
                return (
                    <textarea
                        id = 'rawHtmlOutput'
                        className = 'form-control'
                        style = {{
                            fontSize: `${contentFormatting?.fontSize}pt`
                        }}
                        readOnly
                    >
                        { this.processRawHtml(this.getEnclosedBodyContent()) }
                    </textarea>
                )
            } else {
                return (
                    <div
                        id = 'customHtmlContent'
                        className = 'os-host-flexbox'
                        style = {{
                            fontSize: `${contentFormatting?.fontSize}pt`,
                            fontFamily: `${contentFormatting?.fontFamily}`,
                            textAlign: contentFormatting?.align as TextAlignProperty,
                            color: `${contentFormatting?.fontColour}`
                        }}
                        dangerouslySetInnerHTML = {{
                            __html: this.getEnclosedBodyContent()
                        }}
                    />
                );
            }
        }

    /**
     * Process the HTML body template for the {{dataset}} token, and ensure that all data rows are injected for rendering.
     */
        private getEnclosedBodyContent() {
            return this.replaceAllTokenOccurrences(
                (this.props.advancedEditing?.body || VisualConstants.advancedEditing.body.content),
                VisualConstants.advancedEditing.body.dataSetToken,
                this.getBodyDataRowContent()
            );
        }

    /**
     * Process and flatten all data rows into a single, continuous string for processing in the renderer.
     */
        private getBodyDataRowContent() {
            return this.renderDataRowValues().join('');
        }

    /**
     * For each data row, replace any special tokens with the correct values. The {{row}} token will concatenate all values
     * from the data row, and the field/measure display name surrounded with {{ }} will ensure that the value from the dataView
     * is replaced, allowing for more complex layouts within the row.
     */
        private renderDataRowValues() {
            return this.props.visualData.values.map((c) => {
                let rowContent = (this.props.advancedEditing?.row || VisualConstants.advancedEditing.body.content);
                // Manage the {{row}} token
                    rowContent = this.replaceAllTokenOccurrences(
                        rowContent,
                        VisualConstants.advancedEditing.row.dataRowToken,
                        Object.keys(c).map((k) => c[k]).join('')
                    );
                // Handle replacement of current data item token
                    Object.keys(c).forEach((v) => {
                        let format = this.props.visualData.columns.find((col) => col.name === v);
                        rowContent = this.replaceAllTokenOccurrences(
                            rowContent,
                            `{{${v}}}`,
                            valueFormatter.format(c[v], format?.format, true, this.props.host.locale)
                        );
                    });
                return rowContent;
            });
        }

    /**
     * For the supplied text, search and replace all occurrences of the search value with the replace value.
     *
     * @param text      - The text value to search against.
     * @param search    - The search value/token.
     * @param replace   - The value to replace with.
     */
        private replaceAllTokenOccurrences(text: string, search: string, replace: string) {
            return text.split(search).join(replace);
        }

    /**
     * Take supplied HTML string and use the DOM to 'pretty print' it.
     *
     * @param rawHtml   - HTML content to process.
     */
        private processRawHtml(rawHtml: string) {
            let div = document.createElement('div');
            div.innerHTML = rawHtml.trim();
            return this.formatRawHtml(div, 0).innerHTML;
        }

    /**
     * Use to recursively add child elements to the DOM for pretty printing.
     *
     * @param node  - HTML Element to operate on.
     * @param level - Current level of the DOM tree.
     */
        private formatRawHtml(node: Element, level) {
            let indentBefore = new Array(level++ + 1).join('  '),
                indentAfter  = new Array(level - 1).join('  '),
                textNode: Text;
            for (var i = 0; i < node.children.length; i++) {
                textNode = document.createTextNode(indentBefore);
                node.insertBefore(textNode, node.children[i]);
                this.formatRawHtml(node.children[i], level);
                if (node.lastElementChild == node.children[i]) {
                    textNode = document.createTextNode(indentAfter);
                    node.appendChild(textNode);
                }
            }
            return node;
        }
    }

    export default VisualContent;
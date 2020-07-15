// Power BI dependencies
    import { valueFormatter } from 'powerbi-visuals-utils-formattingutils';

// External dependencies
    import * as React from 'react';

// Internal dependencies
    import {
        IVisualContentProps
    } from '../interfaces';
    import { VisualConstants } from '../VisualConstants';

    export class VisualContent extends React.Component<IVisualContentProps, {}> {

        render() {
            console.log(this.props.contentFormatting?.showRawHtml);
            if (this.props.contentFormatting?.showRawHtml) {
                return (
                    <div
                        id = 'customHtmlContent'
                        className = 'os-host-flexbox'
                    >
                        <code
                            id = 'rawHtmlContent'
                        >
                            { this.getEnclosedBodyContent() }
                        </code>
                    </div>
                )
            } else {
                return (
                    <div
                        id = 'customHtmlContent'
                        className = 'os-host-flexbox'
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

    }

    export default VisualContent;
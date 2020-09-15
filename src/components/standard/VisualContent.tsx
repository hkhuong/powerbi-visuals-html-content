// Power BI API dependencies
    import { valueFormatter } from 'powerbi-visuals-utils-formattingutils';
// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
    import { TextAlignProperty } from 'csstype'
    var pretty = require('pretty');
// Internal dependencies 
    import { VisualContentProps } from '../../defs/standard';
    import { VisualConstants } from '../../VisualConstants';

/**
 * Standard visual display component; will display either desired output or generated HTML based on settings
 */
    export default class VisualContent extends React.Component<VisualContentProps, {}> {

        render() {
            const {
                contentFormatting
            } = this.props;
            if (contentFormatting?.showRawHtml) {
                return (
                    <textarea
                        id = { VisualConstants.dom.htmlRawOutputIdSelector }
                        className = 'w3-input w3-border w3-round'
                        style = {{
                            fontSize: `${contentFormatting?.fontSize}pt`
                        }}
                        readOnly
                        value = { pretty(this.getEnclosedBodyContent()) }
                    />
                )
            } else {
                return (
                    <div
                        id = { VisualConstants.dom.htmlOutputIdSelector }
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

    }
// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import DataView = powerbi.DataView;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;

    import {
        ITableColumn,
        IVisualValueData,
        IVisualValues,
        IVisualData
    } from './interfaces';

    export namespace DataUtils {

        /**
         * Checks that the supplied data view contains the correct combination of data roles and values, and sets the isValid flag
         * for the view model accordingly.
         * 
         * @param dataViews     - Data views from the visual's update method.
         */
            export function getProcessedDataView(dataViews: DataView[]): IVisualValueData {
                try{
                    const
                        hasBasicDataView =
                            dataViews &&
                            dataViews.length > 0 &&
                            dataViews[0] &&
                            dataViews[0].table &&
                            dataViews[0].metadata &&
                            dataViews[0].metadata.columns &&
                            true ||
                            false,
                        valuesDataRoleIndex = hasBasicDataView
                            ?   getContentRoleMetadataIndex(
                                    dataViews[0].metadata.columns,
                                    'values'
                                )
                            :   -1,
                        usesValuesDataRole = hasBasicDataView &&
                            valuesDataRoleIndex > -1,
                        rows = hasBasicDataView && dataViews[0].table.rows,
                        isDataViewValid = 
                            hasBasicDataView &&
                            usesValuesDataRole ||
                            false,
                        hasData = 
                            isDataViewValid &&
                            rows.length > 0,
                        visualData = 
                            hasData &&
                            mapTable(dataViews[0].table);
                    return {
                        valuesDataRoleIndex: valuesDataRoleIndex,
                        hasData: hasData,
                        isDataViewValid: isDataViewValid,
                        visualData: visualData
                    };
                } catch (e) {
                    return {
                        valuesDataRoleIndex: -1,
                        hasData: false,
                        isDataViewValid: false,
                        visualData: null
                    }
                }
            }

        /**
         * Takes the dataView and maps columns and rows as key/value pairs, removing any granularity
         * values
         * 
         * @param table - table from the dataView.
         */
            function mapTable(table: powerbi.DataViewTable): IVisualData {
                const
                    columns: ITableColumn[] = table.columns
                        .filter((c) => c.roles?.values)
                        .map((c, ci) => ({
                                    name: c.displayName,
                                    index: c.index,
                                    isMeasure: c.isMeasure,
                                    format: c.format
                                })
                            ),
                    values = table.rows.map((r, ri) => {
                            let row: IVisualValues = {};
                            r.forEach((c, ci) => {
                                const col = columns.find((col) => col.index === ci);
                                if (col) {
                                    row[col.name] = c
                                }
                            });
                            return row;
                        });
                    return {
                        columns: columns,
                        values: values
                    };
            }

        /**
         * Checks the supplied columns for the correct index of the content column, so that we can map it correctly later.
         * 
         * @param columns   - Array of metadata columns from the Power BI data view.
         */
            function getContentRoleMetadataIndex(columns: DataViewMetadataColumn[], role: string) {
                return columns.findIndex((c) => c.roles[`${role}`]);
            }


    }

    export default DataUtils;
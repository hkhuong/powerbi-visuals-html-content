// Power BI API Dependencies
    import powerbi from 'powerbi-visuals-api';
    import DataView = powerbi.DataView;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;

    import { IVisualData } from './interfaces';

    export namespace DataUtils {


        /**
         * Checks that the supplied data view contains the correct combination of data roles and values, and sets the isValid flag
         * for the view model accordingly.
         * 
         * @param dataViews     - Data views from the visual's update method.
         */
            export function getProcessedDataView(dataViews: DataView[]): IVisualData {
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
                    contentDataRoleIndex = hasBasicDataView
                        ?   getContentRoleMetadataIndex(
                                dataViews[0].metadata.columns,
                                'content'
                            )
                        :   -1,
                    valuesDataRoleIndex = hasBasicDataView
                        ?   getContentRoleMetadataIndex(
                                dataViews[0].metadata.columns,
                                'values'
                            )
                        :   -1,
                    usesContentDataRole = hasBasicDataView &&
                        contentDataRoleIndex > -1,
                    usesValuesDataRole = hasBasicDataView &&
                        contentDataRoleIndex === -1 &&
                        valuesDataRoleIndex > -1,
                    rows = hasBasicDataView && dataViews[0].table.rows,
                    isDataViewValid = 
                        hasBasicDataView &&
                        (usesContentDataRole || usesValuesDataRole),
                    htmlContent = 
                        hasBasicDataView &&
                        usesContentDataRole &&
                        rows &&
                        rows.map((v) => v[contentDataRoleIndex].toString());
                return {
                    contentDataRoleIndex: contentDataRoleIndex,
                    valuesDataRoleIndex: valuesDataRoleIndex,
                    usesHtmlContentDataRole: usesContentDataRole,
                    usesValuesDataRole: usesValuesDataRole,
                    hasData: rows.length > 0,
                    htmlContentEntries: htmlContent || [],
                    isDataViewValid: isDataViewValid
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
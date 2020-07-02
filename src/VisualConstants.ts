// Internal dependencies
    import { visual } from '../pbiviz.json';

    const
        userVisualHtmlBodyClass = 'htmlDisplayBody',
        userVisualHtmlDataRowClass = 'htmlDisplayDataRow',
        dataSetToken = '{{dataset}}',
        dataRowToken = '{{row}}';
    
    export const VisualConstants = {
        visual: visual,
        support: {
            home: visual.supportUrl,
            privacy: 'https://github.com/dm-p/powerbi-visuals-html-display/blob/master/doc/privacy_policy.md'
        },
        contentFormatting: {
            showRawHtml: false,
            font: {
                family: '"Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif',
                colour: '#000000',
                size: 11,
            },
            align: 'left',
            separation: 'none',
            hyperlinks: false
        },
        advancedEditing: {
            enabled: true,
            stylesheet: {
                content: '/* Add your valid CSS here */'
            },
            script: {
                content: '// Add your custom javascript here'
            },
            body: {
                dataSetToken: dataSetToken,
                content: `<div class="${userVisualHtmlBodyClass}">\n  ${dataSetToken}\n</div>`
            },
            row: {
                dataRowToken: dataRowToken,
                content: `<div class="${userVisualHtmlDataRowClass}">\n  ${dataRowToken}\n</div>`
            }
        },
        dom: {
            viewerIdSelector: 'htmlDisplay',
            stylesheetIdSelector: 'visualUserStylesheet',
            advancedEditorAccordionIdSelector: 'advancedEditorAccordion',
            stylesheetEditorIdSelectorSuffix: 'StylesheetEditor',
            htmlBodyEditorIdSelectorSuffix: 'HtmlHeaderEditor',
            htmlContentEditorIdSelectorSuffix: 'HtmlContentEditor',
            htmlFooterEditorIdSelectorSuffix: 'HtmlFooterEditor',
            scriptIdSelector: 'visualUserScript',
            scriptEditorIdSelector: 'scriptEditor',
            entryClassSelector: 'htmlDisplayEntry',
            statusIdSelector: 'statusMessage',
            contentIdSelector: 'htmlContent',
            landingIdSelector: 'htmlDisplayLandingPage',
            scrollbars: {
                autoUpdate: true
            }
        }
    }
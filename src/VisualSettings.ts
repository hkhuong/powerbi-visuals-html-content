/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ''Software''), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

'use strict';

import { dataViewObjectsParser } from 'powerbi-visuals-utils-dataviewutils';
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import { VisualConstants } from './VisualConstants';

export class VisualSettings extends DataViewObjectsParser {
    public contentFormatting: ContentFormattingSettings = new ContentFormattingSettings();
    public advancedEditing: AdvancedEditingSettings = new AdvancedEditingSettings();
}

export class ContentFormattingSettings {
    // Separate row data
        public separation: string = VisualConstants.contentFormatting.separation;
    // Whether to render as HTML or show raw code
        public showRawHtml: boolean = VisualConstants.contentFormatting.showRawHtml;
    // Allow hyperlinks to be opened using the visual host
        public hyperlinks: boolean = VisualConstants.contentFormatting.hyperlinks;
    // Default font family; used if no explicity styling in HTML body
        public fontFamily: string = VisualConstants.contentFormatting.font.family;
    // Default font size; used if no explicity styling in HTML body
        public fontSize: number = VisualConstants.contentFormatting.font.size;
    // Default font colour; used if no explicity styling in HTML body
        public fontColour: string = VisualConstants.contentFormatting.font.colour;
    // Default font size; used if no explicity styling in HTML body
        public align: string = VisualConstants.contentFormatting.align;
}

export class AdvancedEditingSettings {
    // Enabled
        public enabled: boolean = VisualConstants.advancedEditing.enabled;
    // Custom stylesheet
        public stylesheet: string = VisualConstants.advancedEditing.stylesheet.content;
    // Custom stylesheet
        public script: string = VisualConstants.advancedEditing.script.content;
    // Body content
        public body: string = VisualConstants.advancedEditing.body.content;
    // Data row template content
        public row: string = VisualConstants.advancedEditing.row.content;
}
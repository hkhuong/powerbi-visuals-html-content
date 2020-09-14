// External dependencies
    import * as React from 'react';
// Internal dependencies
    import { EditorHeaderProps } from '../../defs/advanced';
    import { VisualConstants } from '../../VisualConstants';
    import { resolveDevMessage } from '../Common';
    import SponsorIcon from '../external/SponsorIcon';
    import RepoIcon from '../external/RepoIcon';
    import PrivacyPolicyIcon from '../external/PrivacyPolicyIcon';

/**
 * Header component of advanced editor UI
 */
    export default class EditorHeader extends React.Component<EditorHeaderProps, {}> {
        render() {
            const {
                localisationManager,
                host
            } = this.props;
            return (
                <header className = 'w3-border-bottom'>
                    <div className = 'w3-row editor-header'>
                        <div className = 'w3-col w3-container s6 editor-header-col'>
                            <h5>
                                { this.props.localisationManager.getDisplayName('Advanced_Editor_Heading_Options') } 
                            </h5>
                        </div>
                        <div className = 'w3-col s6 w3-container visual-name info editor-header-col'>
                            { VisualConstants.visual.displayName }&nbsp;<strong>{ VisualConstants.visual.version}</strong>&nbsp;
                            <PrivacyPolicyIcon host = { host } localisationManager = { localisationManager } />&nbsp;
                            <SponsorIcon host = { host } localisationManager = { localisationManager } /> &nbsp;
                            <RepoIcon host = { host } localisationManager = { localisationManager } />&nbsp;
                            { resolveDevMessage() }
                        </div>
                    </div>
                </header>
            );
        }
    }
// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// Internal dependencies
    import { VisualConstants } from '../../VisualConstants';
    import { LandingPageProps } from '../../defs/landing';
    import { resolveDevMessage } from '../../utils/react_component';
    import SponsorIcon from '../external/SponsorIcon';
    import RepoIcon from '../external/RepoIcon';
    import PrivacyPolicyIcon from '../external/PrivacyPolicyIcon';

    export default class LandingPage extends React.Component<LandingPageProps, {}> {
        render() {
            const {
                localisationManager,
                host
            } = this.props;
            return(
                <OverlayScrollbarsComponent
                    options = { VisualConstants.dom.scrollbars }
                >                    
                    <div id = { VisualConstants.dom.landingIdSelector } >
                        <header className = 'w3-border-left w3-border-right w3-border-top w3-cell-row'>
                            <div className = 'w3-container w3-cell'>
                                <h3>{ VisualConstants.visual.displayName }</h3>
                            </div>
                            <div className = 'w3-container w3-cell bar w3-align-right visual-logo'>

                            </div>
                        </header>
                        <div className = 'w3-container w3-border-left w3-border-right w3-border-bottom bar w3-right-align'>
                            <strong>{ VisualConstants.visual.version }</strong>&nbsp;
                            <PrivacyPolicyIcon host = { host } localisationManager = { localisationManager } />&nbsp;
                            <SponsorIcon host = { host } localisationManager = { localisationManager } /> &nbsp;
                            <RepoIcon host = { host } localisationManager = { localisationManager } />&nbsp;
                            { resolveDevMessage() }
                        </div>
                        <div className = 'w3-container'>
                            <p>{ localisationManager.getDisplayName('Landing_Page_Overview_1') }</p>
                            <p>
                                { localisationManager.getDisplayName('Landing_Page_Overview_2') }
                            </p>
                            <ul className = 'list-group list-group-flush'>
                                    <li className = 'list-group-item'>
                                        { localisationManager.getDisplayName('Landing_Page_Overview_List_1') }
                                    </li>
                                    <li className = 'list-group-item'>
                                        { localisationManager.getDisplayName('Landing_Page_Overview_List_2') }
                                    </li>
                                </ul>
                            <p>{ localisationManager.getDisplayName('Landing_Page_Overview_3') }</p>
                            <p>{ localisationManager.getDisplayName('Landing_Page_Overview_4') }</p>
                        </div>
                    </div>
                </OverlayScrollbarsComponent> 
            )
        }
    }
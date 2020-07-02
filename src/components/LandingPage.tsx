// Power BI API references
    import powerbiVisualsApi from 'powerbi-visuals-api';
    import powerbi = powerbiVisualsApi;
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;

// External dependencies
    import * as React from 'react';
    import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

// Internal dependencies
    import { VisualConstants } from '../VisualConstants';
    import { ILandingPageProps } from '../interfaces';
    import 'bootstrap/dist/js/bootstrap.bundle';

    export class LandingPage extends React.Component<ILandingPageProps, {}> {
        
        constructor(props: ILandingPageProps) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }

        render() {
            const {
                localisationManager
            } = this.props;
            return(
                <OverlayScrollbarsComponent
                    options = { VisualConstants.dom.scrollbars }
                >                    
                    <div id = { VisualConstants.dom.landingIdSelector } >  
                        <div className = 'card bg-light mb-3'>
                            <div className = 'card-header'>
                                <h4>{ VisualConstants.visual.displayName }</h4>
                                <span className = 'text-muted'>
                                    { VisualConstants.visual.version } <br/>
                                    <small>
                                        <a
                                            href = { VisualConstants.support.home }
                                            className = 'card-link'
                                            onClick = { this.handleClick }
                                        >
                                            { localisationManager.getDisplayName('Landing_Page_Visual_Home_Link_Text') }
                                        </a>
                                        <a
                                            href = { VisualConstants.support.privacy }
                                            className = 'card-link'
                                            onClick = { this.handleClick }
                                        >
                                            { localisationManager.getDisplayName('Landing_Page_Visual_Privacy_Link_Text') }
                                        </a>
                                    </small>
                                </span>
                            </div>
                            <div className = 'card-body small'>
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
                    </div>
                </OverlayScrollbarsComponent> 
            )
        }

        /**
         * Ensure that any URLs are delegated to Power BI for opening.
         *
         * @param e - Click event
         */
            handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                this.props.host.launchUrl(e.currentTarget.href);
          };

    }

    export default LandingPage;
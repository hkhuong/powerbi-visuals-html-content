// External dependencies
    import * as React from 'react';
    import { GoHeart } from 'react-icons/go';
// Internal dependencies
    import { ClickableIconExternalLinkProps } from '../../defs/external';
    import { VisualConstants } from '../../VisualConstants';
    import { handleUiIconExternal } from '../Common';

    export default class SponsorIcon extends React.Component<ClickableIconExternalLinkProps, {}> {
        render() {
            return(
                <a  
                    href = { VisualConstants.support.sponsors }
                    onClick = { (e) => handleUiIconExternal(e, this.props.host) }
                    title = { this.props.localisationManager.getDisplayName('GitHub_Sponsors_Tooltip') }
                >
                    <GoHeart className = 'visual-icon'/>
                </a>
            );
        }
    }


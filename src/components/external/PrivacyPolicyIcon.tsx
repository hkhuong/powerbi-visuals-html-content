// External dependencies
    import * as React from 'react';
    import { GoShield } from 'react-icons/go';
// Internal dependencies
    import { ClickableIconExternalLinkProps } from '../../defs/external';
    import { VisualConstants } from '../../VisualConstants';
    import { handleUiIconExternal } from '../Common';

    export default class SponsorIcon extends React.Component<ClickableIconExternalLinkProps, {}> {
        render() {
            return(
                <a  
                    href = { VisualConstants.support.privacy }
                    onClick = { (e) => handleUiIconExternal(e, this.props.host) }
                    title = { this.props.localisationManager.getDisplayName('Privacy_Policy_Tooltip') }
                >
                    <GoShield className = 'visual-icon'/>
                </a>
            );
        }
    }


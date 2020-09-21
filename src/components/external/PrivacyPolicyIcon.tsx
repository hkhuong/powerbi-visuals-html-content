// External dependencies
    import * as React from 'react';
    import { GoLock } from 'react-icons/go';
// Internal dependencies
    import { ClickableIconExternalLinkProps } from '../../defs/external';
    import { VisualConstants } from '../../VisualConstants';
    import { handleUiIconExternal } from '../../utils/react_component';

    export default class PrivacyPolicyIcon extends React.Component<ClickableIconExternalLinkProps, {}> {
        render() {
            return(
                <a  
                    href = { VisualConstants.support.privacy }
                    onClick = { (e) => handleUiIconExternal(e, this.props.host) }
                    title = { this.props.localisationManager.getDisplayName('Privacy_Policy_Tooltip') }
                >
                    <GoLock className = 'visual-icon'/>
                </a>
            );
        }
    }


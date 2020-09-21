// External dependencies
    import * as React from 'react';
    import { GoIssueOpened } from 'react-icons/go';
// Internal dependencies
    import { ClickableIconExternalLinkProps } from '../../defs/external';
    import { VisualConstants } from '../../VisualConstants';
    import { handleUiIconExternal } from '../../utils/react_component';

    export default class IssuesIcon extends React.Component<ClickableIconExternalLinkProps, {}> {
        render() {
            return(
                <a  
                    href = { VisualConstants.support.issues }
                    onClick = { (e) => handleUiIconExternal(e, this.props.host) }
                    title = { this.props.localisationManager.getDisplayName('GitHub_Issues_Tooltip') }
                >
                    <GoIssueOpened className = 'visual-icon'/>
                </a>
            );
        }
    }


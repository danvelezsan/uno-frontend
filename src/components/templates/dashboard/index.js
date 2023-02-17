// @packages
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

// @scripts
import DefaultActionBar from '../../molecules/default-action-bar';
import { dimensions } from '../../../styles/global';

// @styles
import styles from './styles';

const TemplateDashboard = ({
    classes,
    children,
    isMenuExpanded,
    isMenuVisible,
    setMenuExpanded
}) => {
    const menuWidth = isMenuExpanded
        ? dimensions.MAIN_MENU_EXPANDED_WIDTH
        : dimensions.MAIN_MENU_COLLAPSED_WIDTH;

    const history = useHistory();

    const matchId = useSelector(state => state?.activeMatch?.matchId);

    useEffect(() => {
        if (matchId > 0) {
            history.push(`/dashboard/match/${matchId}`);
        }
    }, [matchId]);

    return (
        <div className={classes.mainContainer}>
            <DefaultActionBar
                id="default-bar"
                isExpanded={isMenuExpanded}
                onExpand={() => setMenuExpanded(true)}
                onCollapse={() => setMenuExpanded(false)}
                visible={isMenuVisible}
                width={menuWidth}
            />
            <div className={classes.infoContainer}>
                {children}
            </div>
        </div>
    );
};

TemplateDashboard.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    isMenuExpanded: PropTypes.bool,
    isMenuVisible: PropTypes.bool,
    setMenuExpanded: PropTypes.func
};

TemplateDashboard.defaultProps = {
    isMenuExpanded: false,
    isMenuVisible: true,
    setMenuExpanded: Function.prototype
};

export default withStyles(styles)(TemplateDashboard);

// @packages
import LoginForm from '../../components/organisms/login-form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import CreateUserForm from '../../components/organisms/create-user-form';
import Login from '../../components/templates/login';

const LoginPage = ({
    id
}) => {
    const [step, setStep] = useState(0);
    return (
    <Login
        id={id}
        backgroundComponent={(
            <div style={{
                backgroundClip: '#ff0',
                opacity: 0.5,
                width: '100%',
                height: '100%'
            }}
            />
        )}
    >
        {step === 0 && (<LoginForm setStep={setStep} />)}
        {step === 1 && (<CreateUserForm setStep={setStep} />)}
    </Login>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = () => ({});

LoginPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

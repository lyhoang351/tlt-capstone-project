import { GetServerSideProps } from 'next';
import React from 'react';
import LoginContent from '../../components/page/log-in';
import { LAYOUT } from '../../configs/constants/misc';

type LoginProps = {};

const Login = (props: LoginProps) => {
    return (
        <div style={{ height: '100vh' }}>
            <LoginContent />
        </div>
    );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
    const defaultReturnProps = {
        currentLayout: LAYOUT.LOGIN,
    };
    try {
        return {
            props: {
                ...defaultReturnProps,
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
};

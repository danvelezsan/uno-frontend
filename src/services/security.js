// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';
import { globalUI } from '../core';

class Security {
    static async login(name, password) {
        try {
            const data = await axios.post(
                config.services.security.login,
                {
                    name,
                    password
                }
            );

            return data;
        } catch (error) {
            globalUI.showAlertNotificationError(
                'error',
                error.message
            );

            throw error;
        }
    }

    static async register(user) {
        try {
            return await axios.post(
                config.services.security.register,
                user
            );
        } catch (error) {
            globalUI.showAlertNotificationError(
                'error',
                error.message
            );
            throw error;
        }
    }
}

export default Security;

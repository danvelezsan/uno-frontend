// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';
import { format } from '../util';
import { globalUI } from '../core';

class Match {
    static async create(userId, requiredPlayers) {
        try {
            const data = await axios.post(
                config.services.match.create,
                {
                    userId,
                    requiredPlayers
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

    static async addPlayer(userId, match) {
        try {
            const data = await axios.post(
                config.services.match.addPlayer,
                {
                    userId,
                    match
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

    static async getAllNotStarted() {
        try {
            const data = await axios.get(
                config.services.match.notStarted
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

    static async findOne(id) {
        try {
            const data = await axios.get(
                format(config.services.match.findOne, id)
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
}

export default Match;

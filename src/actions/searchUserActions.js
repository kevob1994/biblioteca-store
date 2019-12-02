import {SEARCH_USER_LOAN} from './types';

export const searchUser = user => {
    return {
        type: SEARCH_USER_LOAN,
        user
    }
}


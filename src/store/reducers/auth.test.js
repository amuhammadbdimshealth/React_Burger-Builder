import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        const testState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
        const testAction = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        };
        const testResultState = {
            ...testState,
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false
        };
        expect(reducer(testState, testAction)).toEqual(testResultState);
    })
})
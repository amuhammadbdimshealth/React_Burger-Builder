import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const resetOrdersOnLogout = () => {
    return {
        type: actionTypes.RESET_ORDERS_ON_LOGOUT
    }
}

export const logoutUser = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');

    return dispatch => {
        // dispatch(resetOrdersOnLogout());
        dispatch(logoutUser());
    }
    // return {
    //     type: actionTypes.AUTH_LOGOUT
    // }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        //..authenticate the user
        let endpoint = '';

        const signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8XkhFikfYSB6Hm0scOh7XTWakp3lN7bc';

        const signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC8XkhFikfYSB6Hm0scOh7XTWakp3lN7bc';

        endpoint = isSignup ? signupUrl : signinUrl;

        const bodyPayload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(endpoint, bodyPayload)
            .then(response => {
                // console.log(response);
                const expiresIn = (response.data.expiresIn * 1000) //convert to milisec
                const expiratioMsec = new Date().getTime() + expiresIn
                const expirationDate = new Date(expiratioMsec)

                //.. store token and expirationDate in localStorage
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)

                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(error => {
                // console.log(error.response.data.error);
                dispatch(authFail(error.response.data.error.message))
            })

    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const tryAutoSignIn = () => {
    return dispatch => {
        const idToken = localStorage.getItem('token');
        if (!idToken) {
            dispatch(logout()); 
        } else {
            let expirationDate = localStorage.getItem('expirationDate');
            expirationDate = new Date(expirationDate);
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                const localId = localStorage.getItem('userId');
                dispatch(authSuccess({ idToken, localId }));
                const expiratioMsec = expirationDate.getTime() - new Date().getTime();
                dispatch(checkAuthTimeout(expiratioMsec));
            }

        }

    };
}
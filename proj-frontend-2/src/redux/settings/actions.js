import {
    CHANGE_LOCALE
} from '../actions';


export const changeLocale = (locale) => {
    localStorage.setItem('currentLanguage', locale);
    return (
        {
            type: CHANGE_LOCALE,
            payload: locale
        }
    )
}


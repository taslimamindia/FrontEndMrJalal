import React, { useContext } from 'react';
import TokenContext from '../context/TokenContext';
import { useTranslation } from 'react-i18next';
let Language = require('./enums/Language.json');

const Languages = () => {
    const {updateLang} = useContext(TokenContext);
    const { i18n } = useTranslation();
 
    let changeLanguage = (language) => {
        switch (language) {
            case Language.EN:
                i18n.changeLanguage(Language.EN);
                updateLang(Language.EN);
                break;
            case Language.AR:
                i18n.changeLanguage(Language.AR);
                updateLang(Language.AR);
                break;
            case Language.FR:
            default:
                i18n.changeLanguage(Language.FR);
                updateLang(Language.EN);
                break;
        }
    }
    return (
        <div className='language-flex'>
            <button onClick={() => {changeLanguage(Language.FR)}} className='bg-transparent border-0 text-primary'>Fr</button>
            {/* <button onClick={() => {changeLanguage(Language.EN)}}className='bg-transparent border-0 text-primary'>En</button> */}
            <button onClick={() => {changeLanguage(Language.AR)}}className='bg-transparent border-0 text-primary'>Ar</button>
        </div>
    );
}

export default Languages;

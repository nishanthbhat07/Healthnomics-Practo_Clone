import { addLocaleData } from "react-intl";
import enLang from "./entries/en-US";

const AppLocale = {
  en: enLang,
};
addLocaleData(AppLocale.en.data);
export default AppLocale;

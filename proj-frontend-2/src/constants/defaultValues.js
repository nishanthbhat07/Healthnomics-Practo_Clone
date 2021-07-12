/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" },
];

export const firebaseConfig = {
  apiKey: "AIzaSyBcqAC9Z1HJve8g9PDkhl9194Glv5bS_uM",
  authDomain: "healthnomics-adc7c.firebaseapp.com",
  databaseURL: "https://healthnomics-adc7c.firebaseio.com",
  projectId: "healthnomics-adc7c",
  storageBucket: "healthnomics-adc7c.appspot.com",
  messagingSenderId: "25231381515",
  appId: "1:25231381515:web:cf8be07d8e504ad86b630e",
  measurementId: "G-8X5CRL886C",
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";
export const serverURL = "https://practo-apis.herokuapp.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = false;
export const defaultColor = "dark.green";
export const defaultDirection = "ltr";
export const isDarkSwitchActive = true;
export const themeColorStorageKey = "__theme_color";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = false;

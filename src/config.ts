export const ApiKey = '236dabe5'; // Please use your own API key
export const ApiUrl = 'https://www.omdbapi.com/';
export const Apikeylink = '?apikey=' + ApiKey;
export const SearchToken = '&s=';
export const IdToken = '&i=';
export const FullSearchlink = `${ApiUrl}${Apikeylink}${SearchToken}`;
export const FullIdlink = `${ApiUrl}${Apikeylink}${IdToken}`;
export const TimeoutSeconds = 5;


const modificarUrl = (baseUrl: string, params: { [key: string]: any }) => {
    const query = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${query}`;
};

export default modificarUrl;    
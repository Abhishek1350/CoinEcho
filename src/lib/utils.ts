export function buildUrlWithParams(baseUrl: string, params: Record<string, any> = {}): string {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key].toString());
        }
    });
    return url.toString();
}
export const cryptoApiBaseUrl = assertValue(
    import.meta.env.VITE_CRYPTO_API_URL,
    'Missing environment variable: VITE_CRYPTO_API_URL'
  )
  
  export const cryptoApiHost = assertValue(
    import.meta.env.VITE_CRYPTO_API_HOST,
    'Missing environment variable: VITE_CRYPTO_API_HOST'
  )
  
  export const newsApiBaseUrl = assertValue(
    import.meta.env.VITE_NEWS_API_URL,
    'Missing environment variable: VITE_NEWS_API_URL'
  )
  
  export const newsApiHost = assertValue(
    import.meta.env.VITE_NEWS_API_HOST,
    'Missing environment variable: VITE_NEWS_API_HOST'
  )
  
  export const rapidApiKey = assertValue(
    import.meta.env.VITE_RAPID_API_KEY,
    'Missing environment variable: VITE_RAPID_API_KEY'
  )

  export const supabaseUrl = assertValue(
    import.meta.env.VITE_SUPABASE_URL,
    'Missing environment variable: VITE_SUPABASE_URL'
  )

  export const supabaseAnonKey = assertValue(
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    'Missing environment variable: VITE_SUPABASE_ANON_KEY'
  )

  export const portfolioUrl = import.meta.env.VITE_PORTFOLIO_URL
  export const aiResponseUrl = import.meta.env.VITE_AI_RESPONSE_URL
  
  
  /**
   * Asserts that a value is not undefined, and if it is, throws an
   * Error with the given errorMessage.
   *
   * @param v The value to assert.
   * @param errorMessage The error message to include in the Error
   *                     thrown if v is undefined.
   * @returns The value if it is not undefined.
   * @throws If v is undefined.
   */
  function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
      throw new Error(errorMessage)
    }
  
    return v
  }
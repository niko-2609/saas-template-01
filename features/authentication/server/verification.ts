/* eslint-disable @typescript-eslint/no-explicit-any */
   // Generate a token from the CSRF secret
  'use server'
  
  import crypto from 'crypto'

  export const getExpectedToken = (csrfSecret: any) => {
      const expectedToken = crypto.createHmac('sha256', csrfSecret).digest('base64');
      return expectedToken;
  }
   

  export const runtime = "nodejs"
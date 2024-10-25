declare module 'cookie' {
    interface CookieParseOptions {
      decode?(val: string): string;
    }
  
    interface CookieSerializeOptions {
      encode?(val: string): string;
      maxAge?: number;
      domain?: string;
      path?: string;
      expires?: Date;
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: boolean | 'lax' | 'strict' | 'none';
    }
  
    function parse(str: string, options?: CookieParseOptions): { [key: string]: string };
    function serialize(name: string, val: string, options?: CookieSerializeOptions): string;
  }
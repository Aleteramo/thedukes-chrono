import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Per ora il middleware è vuoto, ma qui possiamo aggiungere:
  // - Redirect
  // - Headers personalizzati
  // - Controlli di autenticazione
  // - Rate limiting
  return NextResponse.next()
}

// Configura su quali path il middleware deve essere eseguito
export const config = {
  matcher: [
    // Applica il middleware a tutte le route tranne quelle specificate
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
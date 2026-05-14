export type EmailProvider = 'placeholder' | 'mailerlite' | 'kit';

export type EmailSource =
  | 'newsletter_footer'
  | 'newsletter_inline'
  | 'lead_magnet_download';

export interface EmailCapturePayload {
  email: string;
  firstName?: string;
  source: EmailSource;
  tags: string[];
  cluster?: string;
  route?: string;
  product?: string;
}

export interface EmailCaptureResult {
  ok: boolean;
  placeholder: boolean;
  error?: string;
}

function getProvider(): EmailProvider {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const env = (import.meta.env.VITE_EMAIL_PROVIDER || '').toLowerCase();
    if (env === 'mailerlite' || env === 'kit') return env;
  }
  return 'placeholder';
}

export function buildNewsletterPayload(
  email: string,
  opts: { route?: string; pageType?: string } = {},
): EmailCapturePayload {
  return {
    email,
    source: opts.route === 'footer' ? 'newsletter_footer' : 'newsletter_inline',
    tags: ['newsletter', `source_${opts.route === 'footer' ? 'footer' : 'inline'}`],
    route: opts.route,
  };
}

export async function submitEmailCapture(
  payload: EmailCapturePayload,
): Promise<EmailCaptureResult> {
  const provider = getProvider();

  switch (provider) {
    case 'mailerlite':
    case 'kit':
      return submitToEndpoint('/api/email-capture', payload);

    case 'placeholder':
    default:
      if (typeof console !== 'undefined') {
        console.log(
          `[emailCapture:placeholder] ${payload.source}`,
          JSON.stringify(payload, null, 2),
        );
      }
      return { ok: true, placeholder: true };
  }
}

async function submitToEndpoint(
  endpoint: string,
  payload: EmailCapturePayload,
): Promise<EmailCaptureResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, placeholder: false, error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    return { ok: data.ok !== false, placeholder: false };
  } catch (err) {
    return {
      ok: false,
      placeholder: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

export function serializePayload(payload: EmailCapturePayload): string {
  return JSON.stringify(payload);
}

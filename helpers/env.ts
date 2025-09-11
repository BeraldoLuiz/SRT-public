export function getEnvNum(name: string, def: number): number {
    const raw = (process.env[name] ?? '').trim();
    const n = Number(raw);
    return Number.isFinite(n) ? n : def;
  }
  
  export function resolveBaseUrl(): string {
    const raw = (process.env.BASE_URL || '').trim();
    if (!raw) throw new Error('BASE_URL não definida. Ex.: BASE_URL=http://localhost:3000');
    return /^https?:\/\//i.test(raw) ? raw.replace(/\/+$/, '') : `http://${raw}`.replace(/\/+$/, '');
  }
  
  export function resolveTargets(base: string): string[] {
    const paths = (process.env.LH_PATHS || '/').split(',').map(p => p.trim()).filter(Boolean);
    return paths.map(p => (p.startsWith('/') ? `${base}${p}` : `${base}/${p}`));
  }
  
  export function resolveFormFactors(): Array<'mobile' | 'desktop'> {
    const ff = (process.env.LH_FORM_FACTOR || '').trim().toLowerCase();
    if (ff === 'mobile') return ['mobile'];
    if (ff === 'desktop') return ['desktop'];
    return ['mobile', 'desktop']; // default
  }
  
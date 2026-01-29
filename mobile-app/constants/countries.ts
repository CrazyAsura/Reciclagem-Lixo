export interface Country {
  name: string;
  ddi: string;
  flag: string;
  code: string;
}

export const COUNTRIES: Country[] = [
  { name: 'Brasil', ddi: '+55', flag: '🇧🇷', code: 'BR' },
  { name: 'Estados Unidos', ddi: '+1', flag: '🇺🇸', code: 'US' },
  { name: 'Portugal', ddi: '+351', flag: '🇵🇹', code: 'PT' },
  { name: 'Argentina', ddi: '+54', flag: '🇦🇷', code: 'AR' },
  { name: 'Uruguai', ddi: '+598', flag: '🇺🇾', code: 'UY' },
  { name: 'Paraguai', ddi: '+595', flag: '🇵🇾', code: 'PY' },
  { name: 'Chile', ddi: '+56', flag: '🇨🇱', code: 'CL' },
  { name: 'Bolívia', ddi: '+591', flag: '🇧🇴', code: 'BO' },
  { name: 'Peru', ddi: '+51', flag: '🇵🇪', code: 'PE' },
  { name: 'Colômbia', ddi: '+57', flag: '🇨🇴', code: 'CO' },
  { name: 'Venezuela', ddi: '+58', flag: '🇻🇪', code: 'VE' },
  { name: 'Equador', ddi: '+593', flag: '🇪🇨', code: 'EC' },
  { name: 'Canadá', ddi: '+1', flag: '🇨🇦', code: 'CA' },
  { name: 'Reino Unido', ddi: '+44', flag: '🇬🇧', code: 'GB' },
  { name: 'França', ddi: '+33', flag: '🇫🇷', code: 'FR' },
  { name: 'Alemanha', ddi: '+49', flag: '🇩🇪', code: 'DE' },
  { name: 'Itália', ddi: '+39', flag: '🇮🇹', code: 'IT' },
  { name: 'Espanha', ddi: '+34', flag: '🇪🇸', code: 'ES' },
  { name: 'Japão', ddi: '+81', flag: '🇯🇵', code: 'JP' },
  { name: 'China', ddi: '+86', flag: '🇨🇳', code: 'CN' },
  { name: 'Índia', ddi: '+91', flag: '🇮🇳', code: 'IN' },
  { name: 'Austrália', ddi: '+61', flag: '🇦🇺', code: 'AU' },
  { name: 'México', ddi: '+52', flag: '🇲🇽', code: 'MX' },
  // Add more as needed
];
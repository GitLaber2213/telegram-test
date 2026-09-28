export const theme = {
  color: {
    bg: '#0b141a',
    bgPanel: '#111b21',
    bgChat: '#0b141a',
    bgHover: '#202c33',
    bgInput: '#2a3942',
    bgOutgoing: '#005c4b',
    bgIncoming: '#202c33',
    border: '#2a3942',
    text: '#e9edef',
    textSecondary: '#8696a0',
    accent: '#00a884',
    accentHover: '#06cf9c',
    danger: '#ea4335',
  },
  font: {
    sans: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  radius: {
    md: '8px',
    lg: '12px',
  },
  size: {
    sidebarWidth: '360px',
    headerHeight: '60px',
  },
} as const

export type AppTheme = typeof theme

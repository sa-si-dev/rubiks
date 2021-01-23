export const themes: any = {
  light: {
    name: 'Light',
    properties: {
      '--primary-color': '#9C27B0',
      '--primary-color-dark': '#7B1FA2',
      '--primary-color-text': '#fff',
      '--secondary-bg': '#e0e5ec',
      '--secondary-font-color': '#111',
      '--secondary-light-shadow': 'rgba(255,255,255, 0.5)',
      '--secondary-dark-shadow': 'rgb(163, 177, 198, 0.6)',
      '--secondary-box-shodow': '-9px -9px 16px var(--secondary-light-shadow), 9px 9px 16px var(--secondary-dark-shadow)',
      '--secondary-box-shodow-in': 'inset -9px -9px 16px var(--secondary-light-shadow), inset 9px 9px 16px var(--secondary-dark-shadow)',
      '--shadow-start-color': ' rgba(224, 229, 236, 0)',
      '--shadow-end-color': ' rgba(224, 229, 236, 1)',
    }
  },
  dark: {
    name: 'Dark',
    properties: {
      '--primary-color': '#f7bb0e',
      '--primary-color-dark': '#a37a04',
      '--primary-color-text': '#000',
      '--secondary-bg': 'var(--primary-bg)',
      '--secondary-font-color': 'var(--primary-font-color)',
      '--secondary-light-shadow': 'var(--primary-light-shadow)',
      '--secondary-dark-shadow': 'var(--primary-dark-shadow)',
      '--shadow-start-color': ' rgba(32, 32, 41, 0)',
      '--shadow-end-color': ' rgba(32, 32, 41, 1)',
    }
  }
};
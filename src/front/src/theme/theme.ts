import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

export const RedTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    }
  }
})

export const primeVueTheme = {
  semantic: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#dc2626',
          contrastColor: '#ffffff',
          hoverColor: '#b91c1c',
          activeColor: '#991b1b'
        },
        highlight: {
          background: '#fee2e2',
          focusBackground: '#fecaca',
          color: '#7f1d1d',
          focusColor: '#7f1d1d'
        }
      },
      dark: {
        primary: {
          color: '#f87171',
          contrastColor: '#ffffff',
          hoverColor: '#fca5a5',
          activeColor: '#fecaca'
        },
        highlight: {
          background: 'rgba(239, 68, 68, .1)',
          focusBackground: 'rgba(239, 68, 68, .2)',
          color: '#f87171',
          focusColor: '#fca5a5'
        }
      }
    }
  }
}

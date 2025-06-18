import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

export const GLOBAL = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizeLarge,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizeRegular,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  text: {
    fontSize: TYPOGRAPHY.fontSizeRegular,
    color: COLORS.text,
  },
}); 
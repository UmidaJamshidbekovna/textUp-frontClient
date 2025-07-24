import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { tableAnatomy } from '@chakra-ui/anatomy';

// Создайте хелпер для стилей таблицы
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys);

// Определите стили для каждой части таблицы
const baseStyle = definePartsStyle({
//   th: {
//     color: '#000',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
});

// Создайте конфигурацию темы для таблицы
const tableTheme = defineMultiStyleConfig({
  baseStyle,
});

export default tableTheme;

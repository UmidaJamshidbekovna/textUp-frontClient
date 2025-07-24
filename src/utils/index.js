import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

/**
 * Преобразует дату из UTC в локальную таймзону браузера и форматирует её.
 * @param utcDateString - строка в формате ISO, например: "2025-05-16T10:00:00Z"
 * @param dateFormat - формат вывода, например: "yyyy-MM-dd HH:mm:ss"
 * @returns строка с датой в локальной таймзоне
 */
export function formatUtcToLocal(utcDateString, dateFormat = 'yyyy-MM-dd HH:mm:ss') {
    const utcDate = parseISO(utcDateString);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = utcToZonedTime(utcDate, timeZone);
    return format(zonedDate, dateFormat);
}

export const isFormFilled = (values) => {
    return Object.keys(values).every(key => values[key] !== "" && values[key] !== false && values[key] !== undefined);
}
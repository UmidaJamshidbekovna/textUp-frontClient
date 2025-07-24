export default function analyzeSMSTemplateContent(content) {
    const stats = {
        length: [...content].length,
        linkCount: 0,
        latinCount: 0,
        cyrillicCount: 0,
        numberCount: 0,
        punctuationCount: 0,
        symbolCount: 0,
        spaceCount: 0,
        newlineCount: 0,
        otherCharacters: 0,
        isCyrillic: false,
        smsParts: 1,
    };

    const linkRegex = /https?:\/\/[^\s]+/g;
    stats.linkCount = (content.match(linkRegex) || []).length;

    const allowedLatinSymbols = "! #%.,:;?/()+-&^?{}[]<>/@#$%^+=~*_'()";
    const cyrillicForcingRunes = ['«', '»', '`', '‘', '’', '№', '“', '”', '|', '―'];

    for (const char of content) {
        const code = char.codePointAt(0);

        if (/[A-Za-z]/.test(char)) {
            stats.latinCount++;
        } else if (/[\u0400-\u04FF]/.test(char)) {
            stats.cyrillicCount++;
            stats.isCyrillic = true;
        } else if (/\d/.test(char)) {
            stats.numberCount++;
        } else if (/\p{P}/u.test(char) || /\p{S}/u.test(char)) {
            stats.punctuationCount++;
            if (!allowedLatinSymbols.includes(char)) {
                stats.isCyrillic = true;
            }
        } else if (char === '\n' || char === '\r') {
            stats.newlineCount++;
        } else if (/\s/.test(char)) {
            stats.spaceCount++;
        } else {
            stats.otherCharacters++;
        }

        if (cyrillicForcingRunes.includes(char)) {
            stats.isCyrillic = true;
        }
    }

    const limits = stats.isCyrillic
        ? [70, 134, 201, 268, 335, 402, 469, 536]
        : [160, 306, 459, 612, 765, 918, 1071, 1224];

    for (let i = 0; i < limits.length; i++) {
        if (stats.length <= limits[i]) {
            stats.smsParts = i + 1;
            break;
        }
        if (i === limits.length - 1) {
            stats.smsParts = limits.length + 1;
        }
    }

    return stats;
}

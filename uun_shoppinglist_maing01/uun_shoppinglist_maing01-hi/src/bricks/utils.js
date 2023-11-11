const schemeColors = {
    "light-blue": "#039BE5",
    "blue": "#1976D2",
    "dark-blue": "#3949AB",
    "dark-purple": "#5E35B1",
    "cyan": "#00ACC1",
    "dark-green": "#00897B",
    "green": "#388E3C",
    "light-green": "#7CB342",
    "pink": "#D81B60",
    "red": "#E53935",
    "orange": "#EF6C00",
    "yellow": "#FDD835",
    "purple": "#8E24AA",
    "brown": "#5D4037",
    "steel": "#586D79",
    "grey": "#616161"
};

export function getSchemeColor(color) {
    return schemeColors[color];
};
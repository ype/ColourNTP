class Colours {
    /**
     * Converts the second to a hex value, from 0x000000 to 0xFFFFFF.
     * 00:00:00 corresponds to #000000 and 23:59:59 corresponds to #ffffff.
     *
     * @param   Number  secondInDay   The current second in the day.
     * @return  String                The hex colour value (e.g. #1fd531).
     */
    secondToHexColour (secondInDay) {
        return '#' + ('00000' + (secondInDay / (24 * 60 * 60 - 1) * 0xFFFFFF | 0).toString(16)).slice(-6);
    }


    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue.
     * @param   Number  s       The saturation.
     * @param   Number  l       The lightness.
     * @return  Array           The RGB representation.
     */
    hslToRgb (h, s, l) {
        var r, g, b;

        if (s === 0){
            r = g = b = l;  // Achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [r * 255, g * 255, b * 255];
    }

    /**
     * Converts a hue color value to RGB.
     */
    hue2rgb (p, q, t) {
        if (t < 0) t++;
        if (t > 1) t--;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }


    /**
     * Converts RGB values to a hex colour string.
     */
    rgbToHex (r, g, b) {
        return '#' + (((1 << 24) + (r << 16) + (g << 8) + b) | 0).toString(16).slice(1);
    }


    /**
     * Converts a hex colour string to an array of RGB values.
     */
    hexToRGB (hex) {
        var r = parseInt(hex, 16) >> 16;
        var g = parseInt(hex, 16) >> 8 & 0xFF;
        var b = parseInt(hex, 16) & 0xFF;
        return [r, g, b];
    }


    /**
     * 'Converts' the second to a hex value, as a point along the hue spectrum.
     * 00:00:00 corresponds to #ff0000, 12:00:00 corresponds to #00feff.
     */
    secondToHueColour (secondInDay) {
        var hue = secondInDay / (24 * 60 * 60);
        return rgbToHex.apply(null, hslToRgb(hue, 1, 0.5));
    }


    /**
     * Converts a hex colour to an RGBA string with the provided alpha value.
     */
    rgba (hex, a) {
        var colour = hexToRGB(hex.substring(1, 7));
        return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${a})`;
    }
}

export default Colours;

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                fblue: {
                    light: '#4A8CE1',
                    DEFAULT: '#0063e2',
                    dark: '#00449C',
                },
                fred: {
                    light: '#F46453',
                    DEFAULT: '#f6331c',
                    dark: '#C81702',
                },
                fpink: {
                    light: '#FDBAD3',
                    DEFAULT: '#ee93b5',
                    dark: '#D31059',
                },
                flime: {
                    light: '#E3F869',
                    DEFAULT: '#d7fb03',
                    dark: '#A4BF06',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

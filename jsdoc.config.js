module.exports = {
    plugins: [
        'node_modules/jsdoc-babel',
        'plugins/markdown',
        'plugins/summarize',
        'node_modules/better-docs/category',
    ],
    babel: {
        extensions: ['js', 'es6', 'ts'],
    },
    recurseDepth: 10,
    source: {
        include: ['./src'],
        includePattern: '.+\\.ts(doc|x)?$',
        excludePattern: '(^|\\/|\\\\)_',
    },
    sourceType: 'module',
    tags: {
        allowUnknownTags: true,
        dictionaries: ['jsdoc', 'closure'],
    },
    templates: {
        cleverLinks: false,
        monospaceLinks: false,
    },
    opts: {
        template: 'node_modules/better-docs',
        destination: './documents/',
        recurse: true,
        readme: './README.md'
    },
};

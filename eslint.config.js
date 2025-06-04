export default [
    {
        ignores: ['node_modules', 'dist'],
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly'
            }
        },
        rules: {
            indent: ['warn', 4, { SwitchCase: 1 }],
            quotes: ['warn', 'single'],
            semi: ['warn', 'never'],
            spaceBeforeFunctionParen: 'off',
            eqeqeq: 'off',
            camelcase: 'off',
        }
    }
]

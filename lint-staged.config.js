module.exports = {
    '*.ts': ['prettier --write', 'tsc --noEmit', 'eslint --fix', 'npm test', 'git add'],
};

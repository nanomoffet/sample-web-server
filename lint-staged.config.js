module.exports = {
    '*.ts': ['prettier --write', 'tsc --noEmit --esModuleInterop true', 'eslint --fix', 'npm test', 'git add'],
};

const fs = require('fs');
const path = require('path');
const Identicon = require('identicon.js');
const crypto = require('crypto');

function generateIdenticon(username, size = 200, outputDir = './public/avatars/') {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const hash = crypto.createHash('sha256');
    hash.update(username);
    const hashedUsername = hash.digest('hex');

    const identicon = new Identicon(hashedUsername, { size }).toString();

    const filePath = path.join(outputDir, `${username}.png`);
    fs.writeFileSync(filePath, identicon, { encoding: 'base64' });

    return filePath;
}

module.exports = {
    generateIdenticon,
};

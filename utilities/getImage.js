const fs = require('fs')
const path = require('path')

function getImage(imageName) {
    if (imageName === ""){
        return ""
    }
    const imagePath = path.join(process.cwd(), "uploads", imageName)
    const imageBuffer = fs.readFileSync(imagePath)
    const imageBase64 = imageBuffer.toString('base64')
    return imageBase64
}

module.exports = getImage
import consola from "consola";
import fs from "fs";
const console = consola

const CONFIG = {
    INPUT: "./in",
    OUTPUT: "./out",
}

async function encrypt() {
    // Get Input Files
    let inputFiles: string[] = await getDirFiles(CONFIG.INPUT) as string[];
    inputFiles.forEach(async file => {
        // Encrypt Each File
        await encryptFile(file)
    });
}

async function getDirFiles(dir: string) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(files)
        })
    })
}
function encryptFile(fileP: string) {
    let filePath = `${CONFIG.INPUT}/${fileP}`
    let file = fs.readFileSync(filePath)
    let encrypted = Buffer.from(file).toString('base64')
    let newFilePath = `${CONFIG.OUTPUT}/${fileP}`
    fs.writeFileSync(newFilePath, encrypted,{
        flag: "w"
    })
    console.success(`Encrypted ${fileP}`)
    return newFilePath
}

async function decrypt() {
    // Get Input Files
    let inputFiles: string[] = await getDirFiles(CONFIG.INPUT) as string[];
    inputFiles.forEach(async file => {
        // Decrypt Each File
        await decryptFile(file)
    });
}

function decryptFile(fileP: string) {
    let filePath = `${CONFIG.INPUT}/${fileP}`
    let file = fs.readFileSync(filePath)
    let decrypted = Buffer.from(file.toString(), 'base64')
    let newFilePath = `${CONFIG.OUTPUT}/${fileP}`
    fs.writeFileSync(newFilePath, decrypted,{
        flag: "w"
    })
    console.success(`Decrypted ${fileP}`)
    return newFilePath
}

async function main() {
    let choice = await consola.prompt("What Would You Like To Do? (encrypt/decrypt)",{
        type: "select",
        options: ["encrypt", "decrypt"],
        initial: "encrypt"
    })

    if (choice === "encrypt") {
        await encrypt()
    } else {
        await decrypt()
    }
}

main()
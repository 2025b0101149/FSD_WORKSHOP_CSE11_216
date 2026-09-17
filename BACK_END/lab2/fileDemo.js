import fs from "node:fs/promises";

const filePath = "userData.txt"

async function createFile(content) {
    await fs.writeFile(filePath, content, "UTF-8");
    console.log("File Created Successfully");
}

async function readFile() {
    try {
        let data = await fs.readFile(filePath, "UTF-8");
        console.log("File Read Successfully");
        return data;
    } catch (err) {
        console.error("Error reading file:", err);
    }
}

async function appendFile(content) {
    await fs.appendFile(filePath, content, "UTF-8");
    console.log("Content appended to file successfully");
}

export default { createFile, readFile, appendFile };

createFile("Hello World!")
readFile()
appendFile("\nThis is an appended line.")
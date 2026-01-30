import fs from "fs"

const filePath = "./data/alerts.json"

export const readAlerts = () =>{
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
}

export const writeAlerts = (alerts) => {
    fs.writeFileSync(filePath, JSON.stringify(alerts,null,2))
}

//backend has persistent storage
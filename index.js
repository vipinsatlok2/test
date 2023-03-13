const fs = require('@cyclic.sh/s3fs')

fs.writeFile("satsaheb.txt", "cyclic server me fs vala kaam kar raha hai", "utf-8", (err) => {
    if (err) return console.log("1", err)
    console.log("1")

    fs.readFile("satsaheb.txt", "utf-8", (err, data) => {
        if (err) return console.log("2", err)
        console.log("2", data)

        fs.unlink("satsaheb.txt", (err) => console.log("3", err, "deleted"))
    })
})

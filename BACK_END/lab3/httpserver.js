import http from "http";

const array = [];
const PORT = 8080;

const app = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

   
    if (url === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Welcome to backend");

    }

    else if (url === "/user" && method === "GET") {

        const userdata = {
            id: 101,
            name: "Anmol",
            email: "teotiaanmol9@gmail.com",
            department: "CSE"
        };

        console.log(JSON.stringify(userdata));

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userdata));

    }

    else if (url === "/create" && method === "POST") {

        let body = "";

        req.on("data", (content) => {
            body = body + content;
        });

        req.on("end", () => {

            const data = JSON.parse(body);

            const newUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                department: data.department
            };

            array.push(newUser);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newUser));
        });
    }
    else if(url.startsWith("/delete/") && method === "DELETE") {
        const id=url.split("/")[2];
        const index=array.findIndex(user=>user.id==id);
        if(index!==-1){
            array.splice(index,1);
            return res.end("user deleted successfully");
        }
        res.statusCode = 404;
        res.end("element not found  ");
    }
    else if(url.startsWith("/update/") && method === "PUT") {
        const id=url.split("/")[2];
        const index=array.findIndex(user=>user.id==id);
        if(index!==-1){
            let body = "";

            req.on("data", (content) => {
                body = body + content;
            });

            req.on("end", () => {
                const data = JSON.parse(body);

                array[index] = { ...array[index], ...data };

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(array[index]));
            });
        } else {
            res.statusCode = 404;
            res.end("User not found");
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Route not found");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

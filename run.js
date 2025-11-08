import { spawn } from "node:child_process";

const run = (command, args, name) => {
    const proc = spawn(command, args, { shell: true });

    const log = (data) => {
        process.stdout.write(`[${name}] ${data.toString()}`);
    };

    proc.stdout.on("data", log);
    proc.stderr.on("data", log);

    proc.on("close", (code) => {
        console.log(`[${name}] exited with code ${code}`);
    });
};

run("npm", ["run", "dev", "--prefix", "backend"], "backend");
run("npm", ["run", "dev", "--prefix", "frontend"], "frontend");

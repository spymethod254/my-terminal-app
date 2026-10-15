const readline = require('readline-sync');
const { execSync } = require('child_process');

console.log("Welcome to custom Linux Terminal v1.0");
console.log("Type 'exit' to quit.\n");

while (true) {
    // This creates the classic green terminal prompt look
    const input = readline.question('\x1b[32mhamsogwiji@localhost\x1b[0m:\x1b[34m~\x1b[0m\$ ');
    
    if (input.trim() === 'exit') {
        console.log("Logging out...");
        break;
    }
    
    if (input.trim() === '') continue;

    try {
        // This executes real shell commands natively through your app
        const output = execSync(input, { encoding: 'utf-8' });
        console.log(output);
    } catch (error) {
        // Displays errors cleanly if a command fails
        console.log(`bash: ${input}: command not found or failed`);
    }
}


import { AppState } from "./type";
import { waitForInput } from "./Input";

// const commands: Command[] = [
//     new CommandPrintTodos()
// ]

export abstract class Command {
    constructor(public key: string, private desc: string) {}
    toString() {
        return `${this.key}: ${this.desc}`;
    }
    abstract async run(state: AppState): Promise<void>;
}

export class CommandPrintTodos extends Command {
    constructor() {
        super("p", "모든 할일 출력하기");
    }
    async run(state: AppState): Promise<void> {
        for (const todo of state.todos) {
            const text = todo.toString();
            console.log(text);
        }
        await waitForInput("press any key: ");
    }
}
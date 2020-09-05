import { waitForInput } from "./Input";
import { Priority, AppState, Action } from "./type";
import Todo from "./Todo";
import { Command, CommandPrintTodos, CommandNewTodo } from "./Commond";

const commands: Command[] = [
  new CommandPrintTodos(),
  new CommandNewTodo(),
];

async function main() {
  let state: AppState = {
    todos: [
      new Todo("test1", Priority.High),
      new Todo("test2", Priority.Medium),
      new Todo("test3", Priority.Low),
    ]
  }
  while(true) {
    console.clear();
    for (const command of commands) {
      console.log(command.toString());
    }
    console.log();
    const key = await waitForInput("input command: ");
    console.clear();
    const command = commands.find(item => item.key === key);
    if (command) {
      const action = await command.run(state);
      if (action) {
        state = getNextState(state, action);
      }
    }
  }
}
main();

function getNextState(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "newTodo":
      return {
        ...state,
        todos: [...state.todos, new Todo(action.title, action.priority)],
      }
  }
}

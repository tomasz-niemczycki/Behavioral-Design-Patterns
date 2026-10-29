interface Command {
    execute(): void;
    undo(): void;
}

class Editor {
    private text: string = "";

    getText(): string {
        return this.text;
    }

    setText(text: string): void {
        this.text = text;
    }
}

class AppendCommand implements Command {
    private editor: Editor;
    private textToAdd: string;

    constructor(editor: Editor, textToAdd: string) {
        this.editor = editor;
        this.textToAdd = textToAdd;
    }

    execute(): void {
        this.editor.setText(this.editor.getText() + this.textToAdd);
    }

    undo(): void {
        const current = this.editor.getText();
        this.editor.setText(current.slice(0, current.length - this.textToAdd.length));
    }
}

class ClearCommand implements Command {
    private editor: Editor;
    private backup: string = "";

    constructor(editor: Editor) {
        this.editor = editor;
    }

    execute(): void {
        this.backup = this.editor.getText();
        this.editor.setText("");
    }

    undo(): void {
        this.editor.setText(this.backup);
    }
}

class CommandHistory {
  private done: Command[] = [];
  private undone: Command[] = [];
 
  run(command: Command): void {
    command.execute();
    this.done.push(command);
    this.undone = []; // nowa akcja kasuje możliwość ponawiania
  }
 
  undo(): void {
    const command = this.done.pop(); //Usuwa ostatni element i go zwraca
    if (command === undefined) {
      console.log("(nie ma czego cofać)");
      return;
    }
    command.undo();
    this.undone.push(command);
  }
 
  redo(): void {
    const command = this.undone.pop();
    if (command === undefined) {
      console.log("(nie ma czego ponawiać)");
      return;
    }
    command.execute();
    this.done.push(command);
  }
}
 
//Kod klienta
 
const editor = new Editor();
const history = new CommandHistory();
 
function show(label: string): void {
  console.log(`${label}: "${editor.getText()}"`);
}
 
history.run(new AppendCommand(editor, "Ala "));
history.run(new AppendCommand(editor, "ma "));
history.run(new AppendCommand(editor, "kota"));
show("Po dopisaniu");
 
history.undo();
show("Cofnięcie 1");
 
history.undo();
show("Cofnięcie 2");
 
history.redo();
show("Ponowienie");
 
history.run(new ClearCommand(editor));
show("Po wyczyszczeniu");
 
history.undo();
show("Cofnięcie czyszczenia");
 
history.redo();
show("Ponowienie czyszczenia");
 
history.redo();
 

export {}
interface ChatMediator {
    register(user: User): void;
    send(from: User, text: string, to?: string): void;
}

class User {
    readonly username: string;
    private mediator: ChatMediator;

    constructor(username: string, mediator: ChatMediator) {
        this.username = username;
        this.mediator = mediator;
        this.mediator.register(this);
    }

    send(text: string, to?: string): void {
        this.mediator.send(this, text, to);
    }

    receive(from: string, text: string): void {
        console.log(`[${this.username}] wiadomość od ${from}: ${text}`);
    }
}

class ChatRoom implements ChatMediator {
    private users: Map<string, User> = new Map();

    register(user: User): void {
        this.users.set(user.username, user);
        console.log(`(do czatu dołącza: ${user.username})`);
    }

    send(from: User, text: string, to?: string): void {
        if(to !== undefined) {
            const recipient = this.users.get(to);
            if(recipient === undefined) {
                console.log(`(nie ma użytkownika ${to})`);
                return
            }
            recipient.receive(`${from.username} (prywatnie)`, text);
            return
        }

        for(const user of this.users.values()) {
            if(user !== from) {
                user.receive(from.username, text);
            }
        }
    }
}

//Tests
const room = new ChatRoom();

const tomasz = new User("Tomasz", room);
const gabrysia = new User("Gabrysia", room);
const anna = new User("Anna", room);

console.log('Wiadomość do wszystkich:');
tomasz.send("Witam");

console.log("");

console.log('Wiadomość prywatna:');
tomasz.send("Ta napewno", "Gabrysia");

console.log("");

console.log('Brak odbiorcy:');
tomasz.send("Witam", "Piotr");

console.log("");
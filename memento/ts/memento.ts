interface Snapshot {
    readonly label: string;
}

class PlayerSnapshot implements Snapshot {
    readonly label: string;
    private level: number;
    private health: number;
    private place: string;

    constructor(label: string, level: number, health: number, place: string) {
        this.label = label;
        this.level = level;
        this.health = health;
        this.place = place;
    }

    getState(): {
        level: number;
        health: number;
        place: string;
    }

    {
        return {
            level: this.level,
            health: this.health,
            place: this.place
        }
    };
}

class Player {
    private level: number = 1;
    private health: number = 100;
    private place: string = "Wioska";

    levelUp(): void {
        this.level++;
    }

    takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount)
    }

    moveTo(place: string): void {
        this.place = place;
    }

    save(label: string): Snapshot {
        return new PlayerSnapshot(label, this.level, this.health, this.place);
    }

    restore(snapshot: Snapshot):void {
        const state = (snapshot as PlayerSnapshot).getState();
        this.level = state.level;
        this.health = state.health;
        this.place = state.place;
    }

    describe(): string {
        return `Poziom: ${this.level}, Zdrowie: ${this.health}, Miejsce: ${this.place}`;
    }
}

class SaveManager {
    private saves: Snapshot[] = [];

    add(snapshot: Snapshot): void {
        this.saves.push(snapshot);
        console.log(`Zapisano "${snapshot.label}"`);
    }

    latest(): Snapshot | undefined {
        return this.saves[this.saves.length - 1];
    }

    getByLabel(label: string): Snapshot | undefined {
        return this.saves.find((snapshot) => snapshot.label === label);
    }

    list(): string[] {
        return this.saves.map((snapshot) => snapshot.label);
    }
}

//Tests
const hero = new Player();
const saveManager = new SaveManager();

console.log(`Start: ${hero.describe()}`);

saveManager.add(hero.save("Przed lasem"));

hero.moveTo("Las");
hero.takeDamage(30);
hero.levelUp();
console.log(`W lesie: ${hero.describe()}`);

saveManager.add(hero.save("Przed walką"));

hero.moveTo("Walka ze smokiem");
hero.takeDamage(90);
console.log(`Po walce: ${hero.describe()}`);

const last = saveManager.latest();
if(last !== undefined) {
    hero.restore(last);
}

console.log(`Po wczytaniu: ${hero.describe()}`);

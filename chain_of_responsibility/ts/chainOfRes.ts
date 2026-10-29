//Interfejs żądania oraz obsługi

interface ExpenseRequest {
    description: string;
    amount: number;
}

interface Approver {
    setNext(next: Approver): Approver;
    handle(request: ExpenseRequest): void;
}

//Bazowy handler, trzyma referencję i domyślnie przekazuje dalej żądanie

abstract class BaseApprover implements Approver {
    private next: Approver | null = null;

    setNext(next: Approver): Approver {
        this.next = next;
        return next; //Zwraca następnika
    }

    handle(request: ExpenseRequest): void {
        if(this.next !== null) {
            this.next.handle(request);
        }
        else {
            console.log(`Nikt nie zatwierdził wniosku "${request.description}" (${request.amount} zł)`);
        }
    }
}

//Konkretne handlery
class TeamLeader extends BaseApprover{
    handle(request: ExpenseRequest): void {
        if(request.amount <= 1000) {
            console.log(`Team leader zatwierdził "${request.description}" (${request.amount} zł)`);
        }
        else {
            console.log(`Team leader: ${request.amount} zł to za dużo, przekazuje dalej`);
                super.handle(request);
        }
    }
}

class Manager extends BaseApprover{
    handle(request: ExpenseRequest): void {
        if(request.amount <= 10000) {
            console.log(`Manager zatwierdził "${request.description}" (${request.amount} zł)`);
        }
        else {
            console.log(`Manager: ${request.amount} zł to za dużo, przekazuje dalej`);
                super.handle(request);
        }
    }
}

class Director extends BaseApprover{
    handle(request: ExpenseRequest): void {
        if(request.amount <= 50000) {
            console.log(`Director zatwierdził "${request.description}" (${request.amount} zł)`);
        }
        else {
            console.log(`Director: ${request.amount} zł to za dużo, przekazuje dalej`);
                super.handle(request);
        }
    }
}

//Kod klienta
const teamLeader = new TeamLeader();
const manager = new Manager();
const director = new Director();

teamLeader.setNext(manager).setNext(director);

console.log("Wniosek 1");
teamLeader.handle({description: "Zestaw biurowy", amount: 500});

console.log("");

console.log("Wniosek 2");
teamLeader.handle({description: "Nowe laptopy", amount: 8000});

console.log("");

console.log("Wniosek 3");
teamLeader.handle({description: "Konferencja zagraniczna", amount: 30000});

console.log("");

console.log("Wniosek 4");
teamLeader.handle({description: "Zakup serwisowni", amount: 200000});

console.log("");

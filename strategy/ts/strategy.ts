interface ShippingStrategy {
    getName(): string;
    calculate(weightKg: number): number;
}

class StandardShipping implements ShippingStrategy {
    getName(): string {
        return "Kurier standard";
    }

    calculate(weightKg: number): number {
        return 10 + weightKg * 2;
    }
}

class ExpressShipping implements ShippingStrategy {
    getName(): string {
        return "Kurier express";
    }

    calculate(weightKg: number): number {
        return 25 + weightKg * 4;
    }
}

class ParcelLockerShipping implements ShippingStrategy {
    getName(): string {
        return "Paczkomat"
    }

    calculate(weightKg: number): number {
        return 8 + weightKg;
    }
}

class PickUpInStore implements ShippingStrategy {
    getName(): string {
        return "Odbiór w sklepie"
    }

    calculate(weightKg: number): number {
        return 0;
    }
}

class Cart {
    private totalWeightKg: number = 0;
    private strategy: ShippingStrategy;

    constructor(strategy: ShippingStrategy) {
        this.strategy = strategy;
    }

    addItem(itemName: string, weightKg: number): void {
        this.totalWeightKg += weightKg;
        console.log(`Dodano: ${itemName} (${weightKg} kg)`);
    }

    setShippingStrategy(strategy: ShippingStrategy): void {
        this.strategy = strategy;
    }

    getShippingCost(): number {
        return this.strategy.calculate(this.totalWeightKg);
    }

    printSummary(): void {
        console.log(`Dostawa: ${this.strategy.getName()}, waga ${this.totalWeightKg} kg, koszt ${this.getShippingCost()} zł`);
    }
}

const cart = new Cart(new StandardShipping());

cart.addItem("Klawiatura", 1);
cart.addItem("Monitor", 5);

cart.printSummary();

cart.setShippingStrategy(new ExpressShipping());
cart.printSummary();

cart.setShippingStrategy(new ParcelLockerShipping());
cart.printSummary();

cart.setShippingStrategy(new PickUpInStore());
cart.printSummary();


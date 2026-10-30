interface Sale {
    product: string;
    amount: number;
}

abstract class ReportGenerator {
    generate(): string {
        const sales = this.collectData();
        const parts: string[] = [];

        parts.push(this.formatHeader());
        parts.push(this.formatBody(sales));

        if(this.includeFooter()) {
            parts.push(this.formatFooter(sales));
        }
        return parts.join("\n");
    }

    protected collectData(): Sale[] {
        return [
        { product: "Laptop", amount: 3500 },
        { product: "Mysz", amount: 80 },
        { product: "Monitor", amount: 900 },
        ];
    }

    protected abstract formatBody(sales: Sale[]): string;
        protected formatHeader(): string {
        return "RAPORT SPRZEDAŻY";
    }

    protected includeFooter(): boolean {
        return true;
    }

    protected formatFooter(sales: Sale[]): string {
        const total = sales.reduce((sum, sale) => sum + sale.amount, 0);
        return `Razem: ${total} zł`;
    }
}

class TextReport extends ReportGenerator {
    protected formatBody(sales: Sale[]): string {
        return sales.map((sale) => `- ${sale.product}: ${sale.amount} zł`).join("\n");
    }
}

class HTMLReport extends ReportGenerator {
    protected formatHeader(): string {
        return "<h1>Raport Sprzedaży</h1>"
    }

    protected formatBody(sales: Sale[]): string {
        const items = sales.map((sale) => `<li>${sale.product}: ${sale.amount} zł</li>`).join("\n");
        return `<ul>\n${items}\n</ul>`;
    }

    protected formatFooter(sales: Sale[]): string {
        const total = sales.reduce((sum, sale) => sum + sale.amount, 0);
        return `<p><strong>Razem: ${total} zł</strong></p>`;
    }
}

class ShortTextReport extends TextReport {
    protected includeFooter(): boolean {
        return false;
    }
}

//Tests
console.log(new TextReport().generate());
console.log(new HTMLReport().generate());
console.log(new ShortTextReport().generate());
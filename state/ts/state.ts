interface ArticleState {
    getName(): string;
    submit(article: Article): void;
    approve(article: Article): void;
    reject(article: Article): void;
}

class Article {
    private state: ArticleState;

    constructor() {
        this.state = new DraftState();
        console.log(`Nowy arykuł, stan: ${this.state.getName()}`);
    }

    setState(state: ArticleState): void {
        this.state = state;
        console.log(` -> stan: ${this.state.getName()}`);
    }

    getStateName(): string {
        return this.state.getName();
    }

    submit(): void {
        this.state.submit(this);
    }

    approve(): void {
        this.state.approve(this);
    }

    reject(): void {
        this.state.reject(this);
    }
}

class DraftState implements ArticleState {
    getName(): string {
        return "Szkic";
    }

    submit(article: Article): void {
        console.log("Szkic wysłany do moderacji");
        article.setState(new ModerationState());
    }

    approve(article: Article): void {
        console.log("Nie można zatwierdzić szkicu, najpierw wyślij go do moderacji");
        
    }

    reject(article: Article): void {
        console.log("Szkic nie jest w moderacji, nie ma czego odrzucać");
        
    }
}

class ModerationState implements ArticleState {
    getName(): string {
        return "Moderacja";
    }

    submit(article: Article): void {
        console.log("Artykuł już jest w moderacji");
        
    }

    approve(article: Article): void {
        console.log("Moderator zatwierdził artykuł");
        article.setState(new PublishedState());
    }

    reject(article: Article): void {
        console.log("Moderator odrzucił artykuł, wraca do poprawy");
        article.setState(new DraftState());
    }
}

class PublishedState implements ArticleState {
    getName(): string {
        return "Opublikowany"
    }

    submit(article: Article): void {
        console.log("Artykuł już jest opublikowany");
        
    }
    
    approve(article: Article): void {
        console.log("Artykuł już jest opublikowany");
        
    }

    reject(article: Article): void {
        console.log("Nie można odrzucić opublikowanego artykułu");
        
    }
}

const article = new Article;

article.approve(); 
article.submit();  
article.reject(); 
article.submit();  
article.approve(); 
article.submit();  
article.reject();

export {}
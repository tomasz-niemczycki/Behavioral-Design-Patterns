interface Song {
    title: string;
    artist: string;
}

interface ListIterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface IterableCollection<T> {
    createIterator(): ListIterator<T>;
    createReverseIterator(): ListIterator<T>;
}

class ForwardIterator<T> implements ListIterator<T> {
    private items: T[];
    private position: number = 0;

    constructor(items: T[]) {
        this.items = items;
    }

    hasNext(): boolean {
        return this.position < this.items.length;
    }

    next(): T {
        if(!this.hasNext()) {
            throw new Error("Koniec kolekcji");
        }
        const item = this.items[this.position];
        this.position++;
        return item;
    }
}

class ReverseIterator<T> implements ListIterator<T> {
    private items: T[];
    private position: number;


    constructor(items: T[]) {
        this.items = items;
        this.position = items.length - 1;
    }

    hasNext(): boolean {
        return this.position >= 0;
    }

    next(): T {
        if(!this.hasNext()) {
            throw new Error("Koniec kolekcji");
        }
        const item = this.items[this.position];
        this.position--;
        return item;
    }
}

class Playlist implements IterableCollection<Song> {
  private songs: Song[] = [];
 
  add(song: Song): void {
    this.songs.push(song);
  }
 
  createIterator(): ListIterator<Song> {
    return new ForwardIterator(this.songs);
  }
 
  createReverseIterator(): ListIterator<Song> {
    return new ReverseIterator(this.songs);
  }

  *[Symbol.iterator](): Iterator<Song> {
    for (const song of this.songs) {
      yield song;
    }
  }
}

//Kod klienta
const playlist = new Playlist();
playlist.add({ title: "Utwór A", artist: "Zespół 1" });
playlist.add({ title: "Utwór B", artist: "Zespół 2" });
playlist.add({ title: "Utwór C", artist: "Zespół 3" });
 
console.log("--- Od początku ---");
const forward = playlist.createIterator();
while (forward.hasNext()) {
  const song = forward.next();
  console.log(`${song.title} - ${song.artist}`);
}
 
console.log("\n--- Od końca ---");
const reverse = playlist.createReverseIterator();
while (reverse.hasNext()) {
  const song = reverse.next();
  console.log(`${song.title} - ${song.artist}`);
}
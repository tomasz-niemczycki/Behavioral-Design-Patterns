interface WeatherData {
    temperature: number;
    humidity: number;
}

interface Observer<T> {
    update(data: T): void;
}

interface Subject<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;
    notify(): void;
}

class WeatherStation implements Subject<WeatherData> {
    private observers: Observer<WeatherData>[] = [];
    private data: WeatherData = {temperature: 0, humidity: 0};

    subscribe(observer: Observer<WeatherData>): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer<WeatherData>): void {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    notify(): void {
        for(const observer of this.observers) {
            observer.update(this.data);
        }
    }

    setMeasurments(temperature: number, humidity: number): void {
        this.data = {temperature, humidity};
        console.log(`Stacja: nowy pomiar (${temperature}°C, ${humidity}%)`);
        this.notify();
    }
}

class PhoneApp implements Observer<WeatherData> {
  update(data: WeatherData): void {
    console.log(`  Aplikacja: temperatura ${data.temperature}°C, wilgotność ${data.humidity}%`);
  }
}

class FrostAlert implements Observer<WeatherData> {
  update(data: WeatherData): void {
    if (data.temperature < 0) {
      console.log(`  Alert: przymrozek! (${data.temperature}°C)`);
    }
  }
}

const station = new WeatherStation();
const phoneApp = new PhoneApp();
const frostAlert = new FrostAlert();

station.subscribe(phoneApp);
station.subscribe(frostAlert);

station.setMeasurments(15, 60);
station.setMeasurments(-3, 80);

station.unsubscribe(frostAlert);

station.setMeasurments(-5, 85);